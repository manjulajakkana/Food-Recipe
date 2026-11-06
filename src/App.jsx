
import { useEffect, useMemo, useState } from "react";

import { recipes as initialRecipes } from "./data/recipes";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";

import "./App.css";

const ADMIN_EMAIL = "admin@foodrecipe.demo";
const ADMIN_PASSWORD = "Admin@123";

const emptyShareForm = {
  name: "",
  description: "",
  category: "indian",
  image: "",
  ingredients: "",
  instructions: "",
  time: "",
  difficulty: "Easy",
};

const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

/* ==========================================
   RECIPE LIST CLEANING FUNCTION
   Removes duplicate numbering and blank lines
========================================== */

const cleanRecipeItems = (value, removeNumbers = false) => {
  const items = Array.isArray(value)
    ? value
    : String(value || "").split(/\r?\n/);

  return items
    .map((item) => String(item).trim())
    .filter(Boolean)
    .map((item) => {
      if (removeNumbers) {
        return item
          .replace(
            /^(?:(?:step\s*)?\d+\s*[.):\-]\s*|[-•*]\s*)+/i,
            ""
          )
          .trim();
      }

      return item.replace(/^[-•*]\s*/, "").trim();
    })
    .filter(Boolean);
};

function App() {
  const [recipeList, setRecipeList] = useState(() =>
    readStorage("foodRecipeRecipes", initialRecipes)
  );

  const [favorites, setFavorites] = useState(() =>
    readStorage("favoriteRecipes", [])
  );

  const [registeredUsers, setRegisteredUsers] = useState(() =>
    readStorage("registeredUsers", [])
  );

  const [reviews, setReviews] = useState(() =>
    readStorage("recipeReviews", [])
  );

  const [currentUser, setCurrentUser] = useState(() =>
    readStorage("foodRecipeCurrentUser", null)
  );

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const [authMode, setAuthMode] = useState(null);

  const [shareForm, setShareForm] = useState(emptyShareForm);
  const [shareMessage, setShareMessage] = useState("");

  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });

  // Save all application data.

  useEffect(() => {
    localStorage.setItem(
      "foodRecipeRecipes",
      JSON.stringify(recipeList)
    );
  }, [recipeList]);

  useEffect(() => {
    localStorage.setItem(
      "favoriteRecipes",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(registeredUsers)
    );
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem(
      "recipeReviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "foodRecipeCurrentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("foodRecipeCurrentUser");
    }
  }, [currentUser]);

  // Add the demo administrator account if it does not exist.

  useEffect(() => {
    setRegisteredUsers((previousUsers) => {
      const exists = previousUsers.some(
        (user) => user.email?.toLowerCase() === ADMIN_EMAIL
      );

      if (exists) return previousUsers;

      return [
        ...previousUsers,
        {
          id: "admin-user",
          name: "Admin",
          username: "Admin",
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          role: "admin",
        },
      ];
    });
  }, []);

  // Open and close authentication popup.

  const openLogin = () => setAuthMode("login");
  const openSignup = () => setAuthMode("signup");
  const closeAuth = () => setAuthMode(null);

  // Login.

  const handleLogin = (email, password) => {
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanEmail || !password) {
      return {
        success: false,
        message: "Please enter your email and password.",
      };
    }

    if (
      cleanEmail === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setCurrentUser({
        id: "admin-user",
        name: "Admin",
        username: "Admin",
        email: ADMIN_EMAIL,
        role: "admin",
      });

      setCurrentPage("admin");
      setAuthMode(null);

      return {
        success: true,
        message: "Admin login successful!",
      };
    }

    const user = registeredUsers.find(
      (item) =>
        item.email?.toLowerCase() === cleanEmail &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username || user.name,
      email: user.email,
      role: "user",
    });

    setCurrentPage("home");
    setAuthMode(null);

    return {
      success: true,
      message: "Login successful!",
    };
  };

  // Signup.

  const handleSignup = (name, email, password) => {
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      return {
        success: false,
        message: "Please fill in all the fields.",
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    if (String(password).length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    const alreadyExists = registeredUsers.some(
      (user) => user.email?.toLowerCase() === cleanEmail
    );

    if (alreadyExists) {
      return {
        success: false,
        message: "This email is already registered.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      username: cleanName,
      email: cleanEmail,
      password,
      role: "user",
    };

    setRegisteredUsers((previousUsers) => [
      ...previousUsers,
      newUser,
    ]);

    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      role: "user",
    });

    setCurrentPage("home");
    setAuthMode(null);

    return {
      success: true,
      message: "Account created successfully!",
    };
  };

  // Logout.

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
    setSelectedRecipe(null);
    setShowFavorites(false);
    setAuthMode(null);
  };

  // Go to homepage.

  const openHome = () => {
    setCurrentPage("home");
    setSelectedRecipe(null);
    setShowFavorites(false);
    setSelectedCategory("all");
    setSearchText("");
  };

  // Add or remove favourites.

  const toggleFavorite = (recipeId) => {
    setFavorites((previous) => {
      if (previous.includes(recipeId)) {
        return previous.filter((id) => id !== recipeId);
      }

      return [...previous, recipeId];
    });
  };

  // Delete shared recipe.

  const handleDeleteSharedRecipe = (recipe) => {
    if (!currentUser) {
      openLogin();
      return;
    }

    if (recipe.sharedByEmail !== currentUser.email) {
      alert("You can delete only recipes shared by your account.");
      return;
    }

    if (!window.confirm(`Delete "${recipe.name}"?`)) return;

    removeRecipe(recipe.id);
  };

  // Common recipe deletion function.

  const removeRecipe = (recipeId) => {
    setRecipeList((previous) =>
      previous.filter((recipe) => recipe.id !== recipeId)
    );

    setFavorites((previous) =>
      previous.filter((id) => id !== recipeId)
    );

    setReviews((previous) =>
      previous.filter((review) => review.recipeId !== recipeId)
    );

    setSelectedRecipe((previous) =>
      previous?.id === recipeId ? null : previous
    );
  };

  // Admin delete callback.

  const handleDeleteRecipe = (recipeId) => {
    removeRecipe(recipeId);
  };

  // Add recipe from admin dashboard.

  const handleAddRecipe = (newRecipe) => {
    const recipeToAdd = {
      ...newRecipe,
      id: Date.now(),

      ingredients: cleanRecipeItems(newRecipe.ingredients),

      instructions: cleanRecipeItems(
        newRecipe.instructions,
        true
      ),

      author: "Admin",
    };

    setRecipeList((previous) => [
      recipeToAdd,
      ...previous,
    ]);
  };

  // Update recipe from admin dashboard.

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipeList((previous) =>
      previous.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? {
              ...recipe,
              ...updatedRecipe,

              ingredients: cleanRecipeItems(
                updatedRecipe.ingredients ?? recipe.ingredients
              ),

              instructions: cleanRecipeItems(
                updatedRecipe.instructions ?? recipe.instructions,
                true
              ),
            }
          : recipe
      )
    );
  };

  // Open share recipe page.

  const openSharePage = () => {
    if (!currentUser) {
      openLogin();
      return;
    }

    setShareForm(emptyShareForm);
    setShareMessage("");
    setCurrentPage("share");
  };

  // Share form input.

  const handleShareInput = (event) => {
    const { name, value } = event.target;

    setShareForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Upload recipe image.

  const handleShareImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setShareMessage("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setShareForm((previous) => ({
        ...previous,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // Publish shared recipe.

  const submitSharedRecipe = (event) => {
    event.preventDefault();

    if (!currentUser) {
      openLogin();
      return;
    }

    if (
      !shareForm.name.trim() ||
      !shareForm.description.trim() ||
      !shareForm.ingredients.trim() ||
      !shareForm.instructions.trim()
    ) {
      setShareMessage("Please fill in all required fields.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: shareForm.name.trim(),
      description: shareForm.description.trim(),
      category: shareForm.category,
      craving: "",
      image: shareForm.image || "images/pizza.jpg",

      ingredients: cleanRecipeItems(
        shareForm.ingredients
      ),

      instructions: cleanRecipeItems(
        shareForm.instructions,
        true
      ),

      time: shareForm.time.trim() || "30 min",
      difficulty: shareForm.difficulty,
      rating: "New",
      author: currentUser.name,
      sharedBy: currentUser.name,
      sharedByEmail: currentUser.email,
      isShared: true,
    };

    setRecipeList((previous) => [
      newRecipe,
      ...previous,
    ]);

    setShareForm(emptyShareForm);
    setShareMessage("");
    setCurrentPage("home");

    alert("Your recipe has been shared successfully!");
  };

  // Submit review.

  const submitReview = (event) => {
    event.preventDefault();

    if (!currentUser) {
      openLogin();
      return;
    }

    if (!reviewForm.comment.trim()) {
      alert("Please write your review.");
      return;
    }

    if (!selectedRecipe) return;

    const newReview = {
      id: Date.now(),
      recipeId: selectedRecipe.id,
      userName: currentUser.name,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment.trim(),
      date: new Date().toLocaleDateString(),
    };

    setReviews((previous) => [
      ...previous,
      newReview,
    ]);

    setReviewForm({
      rating: 5,
      comment: "",
    });
  };

  // Filter recipes.

  const visibleRecipes = useMemo(() => {
    return recipeList.filter((recipe) => {
      const search = searchText.toLowerCase();

      const ingredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(" ").toLowerCase()
        : String(recipe.ingredients || "").toLowerCase();

      const matchesSearch =
        recipe.name?.toLowerCase().includes(search) ||
        recipe.description?.toLowerCase().includes(search) ||
        recipe.category?.toLowerCase().includes(search) ||
        ingredients.includes(search);

      const category = String(recipe.category || "").toLowerCase();

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory.toLowerCase() ||
        category.replace(/\s/g, "") ===
          selectedCategory.toLowerCase();

      const matchesFavorite =
        !showFavorites || favorites.includes(recipe.id);

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [
    recipeList,
    searchText,
    selectedCategory,
    showFavorites,
    favorites,
  ]);

  const selectedRecipeReviews = selectedRecipe
    ? reviews.filter(
        (review) => review.recipeId === selectedRecipe.id
      )
    : [];

  // Admin users.

  const adminUser = {
    id: "admin-user",
    name: "Admin",
    username: "Admin",
    email: ADMIN_EMAIL,
    role: "admin",
  };

  const adminAndRegisteredUsers = [
    adminUser,
    ...registeredUsers.filter(
      (user) => user.email?.toLowerCase() !== ADMIN_EMAIL
    ),
  ];

  // Admin dashboard.

  if (currentPage === "admin" && currentUser?.role === "admin") {
    return (
      <AdminDashboard
        recipes={recipeList}
        registeredUsers={adminAndRegisteredUsers}
        reviews={reviews}
        onAddRecipe={handleAddRecipe}
        onUpdateRecipe={handleUpdateRecipe}
        onDeleteRecipe={handleDeleteRecipe}
        onLogout={handleLogout}
        onHome={openHome}
      />
    );
  }

  // Normal user dashboard.

  if (currentPage === "dashboard" && currentUser) {
    return (
      <Dashboard
        currentUser={currentUser}
        onLogout={handleLogout}
        onHome={openHome}
      />
    );
  }

  return (
    <div className={`app ${darkMode ? "app-dark" : ""}`}>

      {/* HEADER */}

      <header className="site-header">
        <div className="header-inner">

          <button className="brand" onClick={openHome}>
            <span className="brand-icon">🍽️</span>
            <span>The Food Recipe</span>
          </button>

          <nav className="main-nav">
            <button onClick={openHome}>Home</button>

            <button
              onClick={() =>
                document
                  .getElementById("recipes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Recipes
            </button>

            <button onClick={openSharePage}>
              Share Recipe
            </button>
          </nav>

          <div className="header-actions">

            <button
              className="header-favorite"
              onClick={() => {
                setCurrentPage("home");
                setShowFavorites((previous) => !previous);

                document
                  .getElementById("recipes")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              title="Show favourites"
            >
              ♥ {favorites.length}
            </button>

            <button
              className="theme-toggle"
              onClick={() => setDarkMode((previous) => !previous)}
              title="Change theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {currentUser ? (
              <>
                <button
                  className="account-button"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  👤 {currentUser.name}
                </button>

                <button
                  className="login-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="login-button"
                onClick={openLogin}
              >
                👤 Login
              </button>
            )}

          </div>
        </div>
      </header>

      {/* HOME PAGE */}

      {currentPage === "home" && (
        <main>

          {/* HERO */}

          <section className="hero-section">
            <div className="hero-content">

              <p className="hero-eyebrow">
                WELCOME TO THE FOOD RECIPE
              </p>

              <h1>
                Discover delicious food.
                <br />
                Discover happiness.
              </h1>

              <p>
                Delicious recipes, easy cooking and food inspiration
                all in one place.
              </p>

              <div className="hero-search">
                <input
                  type="text"
                  placeholder="Search for biryani, pizza, cake..."
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                />

                <button
                  onClick={() =>
                    document
                      .getElementById("recipes")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  🔍 Search
                </button>
              </div>

              <button
                className="primary-button"
                onClick={openSharePage}
              >
                + Share Your Recipe
              </button>

            </div>

            <div className="hero-image-area">
              <div className="hero-image-frame">
                <img
                  src="images/biryani.jpg"
                  alt="Delicious food"
                  onError={(event) => {
                    event.currentTarget.src = "images/pizza.jpg";
                  }}
                />
              </div>

              <div className="hero-floating-card">
                <strong>{recipeList.length}+</strong>
                <span>Delicious recipes</span>
              </div>
            </div>
          </section>

          {/* CRAVINGS */}

          <section className="craving-section">
            <div className="section-heading">
              <p className="hero-eyebrow">EXPLORE BY TASTE</p>
              <h2>What are you craving? 😊</h2>
              <p>Tell us what your taste buds want today.</p>
            </div>

            <div className="craving-options">
              {[
                { name: "Spicy", emoji: "🌶️" },
                { name: "Sweet", emoji: "🍰" },
                { name: "Healthy", emoji: "🥗" },
                { name: "Cheesy", emoji: "🧀" },
                { name: "Fresh", emoji: "🥑" },
                { name: "Savory", emoji: "🍟" },
              ].map((item) => (
                <button
                  className="craving-option"
                  key={item.name}
                  onClick={() => {
                    setSearchText(item.name);
                    setSelectedCategory("all");
                    setShowFavorites(false);

                    document
                      .getElementById("recipes")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>{item.emoji}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </section>

          {/* RECIPE COLLECTION */}

          <section className="recipes-section" id="recipes">

            <div className="section-heading">
              <p className="hero-eyebrow">OUR COLLECTION</p>

              <h2>
                {showFavorites
                  ? "Your Favourite Recipes"
                  : "Explore Our Recipes"}
              </h2>

              <p>
                Discover tasty recipes and find your next favourite dish.
              </p>
            </div>

            <div className="recipe-toolbar">
              <div className="category-buttons">
                {[
                  ["all", "All"],
                  ["indian", "Indian"],
                  ["chinese", "Chinese"],
                  ["fastfood", "Fast Food"],
                  ["italian", "Italian"],
                  ["dessert", "Desserts"],
                  ["healthy", "Healthy"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={
                      selectedCategory === value ? "active" : ""
                    }
                    onClick={() => {
                      setSelectedCategory(value);
                      setShowFavorites(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                className="favorites-filter"
                onClick={() =>
                  setShowFavorites((previous) => !previous)
                }
              >
                {showFavorites
                  ? "Show All Recipes"
                  : "♥ My Favourites"}
              </button>
            </div>

            <div className="recipe-search-row">
              <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
              />
            </div>

            <div className="recipe-grid">

              {visibleRecipes.map((recipe) => {
                const isFavorite = favorites.includes(recipe.id);

                const isOwner =
                  currentUser &&
                  recipe.isShared &&
                  recipe.sharedByEmail === currentUser.email;

                return (
                  <article className="recipe-card" key={recipe.id}>

                    <div className="recipe-image-wrap">
                      <img
                        className="recipe-image"
                        src={recipe.image || "images/pizza.jpg"}
                        alt={recipe.name}
                        onError={(event) => {
                          event.currentTarget.src = "images/pizza.jpg";
                        }}
                      />

                      <span className="recipe-category">
                        {recipe.category}
                      </span>

                      <button
                        className={`favorite-button ${
                          isFavorite ? "is-favorite" : ""
                        }`}
                        onClick={() => toggleFavorite(recipe.id)}
                        title="Add or remove favourite"
                      >
                        {isFavorite ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="recipe-info">
                      <h3>{recipe.name}</h3>

                      <p>{recipe.description}</p>

                      {recipe.isShared && (
                        <p className="shared-by">
                          Shared by {recipe.sharedBy || "A user"}
                        </p>
                      )}

                      <div className="recipe-rating">
                        <span>★</span>
                        {recipe.rating || "New recipe"}
                      </div>

                      <div className="recipe-meta">
                        <span>⏱ {recipe.time || "30 min"}</span>
                        <span>🍳 {recipe.difficulty || "Easy"}</span>
                      </div>

                      <div className="recipe-card-actions">
                        <button
                          className="view-button"
                          onClick={() => {
                            setSelectedRecipe(recipe);
                            setReviewForm({
                              rating: 5,
                              comment: "",
                            });
                          }}
                        >
                          View Recipe
                        </button>

                        {isOwner && (
                          <button
                            className="delete-shared-button"
                            onClick={() =>
                              handleDeleteSharedRecipe(recipe)
                            }
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>

                  </article>
                );
              })}

            </div>

            {visibleRecipes.length === 0 && (
              <div className="empty-state">
                <h3>No recipes found</h3>

                <p>
                  Try another search or select a different category.
                </p>

                <button
                  className="secondary-button"
                  onClick={() => {
                    setSearchText("");
                    setSelectedCategory("all");
                    setShowFavorites(false);
                  }}
                >
                  Show All Recipes
                </button>
              </div>
            )}

          </section>

          {/* SHARE BANNER */}

          <section className="share-banner">
            <h2>Have a delicious recipe to share?</h2>

            <p>
              Share your cooking ideas and let others discover your
              favourite dishes.
            </p>

            <button
              className="primary-button"
              onClick={openSharePage}
            >
              Share Your Recipe
            </button>
          </section>

        </main>
      )}

      {/* SHARE RECIPE PAGE */}

      {currentPage === "share" && (
        <main className="share-page">

          <div className="section-heading">
            <p className="hero-eyebrow">COMMUNITY RECIPES</p>
            <h2>Share Your Recipe</h2>
            <p>Tell everyone about your delicious creation.</p>
          </div>

          <form
            className="share-form"
            onSubmit={submitSharedRecipe}
          >

            <div className="form-grid">
              <label>
                Recipe Name *
                <input
                  name="name"
                  value={shareForm.name}
                  onChange={handleShareInput}
                  placeholder="Enter recipe name"
                  required
                />
              </label>

              <label>
                Category *
                <select
                  name="category"
                  value={shareForm.category}
                  onChange={handleShareInput}
                >
                  <option value="indian">Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="fastfood">Fast Food</option>
                  <option value="italian">Italian</option>
                  <option value="dessert">Dessert</option>
                  <option value="healthy">Healthy</option>
                </select>
              </label>

              <label>
                Preparation Time
                <input
                  name="time"
                  value={shareForm.time}
                  onChange={handleShareInput}
                  placeholder="Example: 30 min"
                />
              </label>

              <label>
                Difficulty
                <select
                  name="difficulty"
                  value={shareForm.difficulty}
                  onChange={handleShareInput}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
            </div>

            <label>
              Description *
              <textarea
                name="description"
                value={shareForm.description}
                onChange={handleShareInput}
                placeholder="Write a short description..."
                rows="3"
                required
              />
            </label>

            <label>
              Ingredients *
              <textarea
                name="ingredients"
                value={shareForm.ingredients}
                onChange={handleShareInput}
                placeholder={"Rice\nTomatoes\nOnions"}
                rows="5"
                required
              />
            </label>

            <label>
              Preparation Instructions *
              <textarea
                name="instructions"
                value={shareForm.instructions}
                onChange={handleShareInput}
                placeholder={
                  "Prepare the ingredients.\nCook everything together."
                }
                rows="6"
                required
              />
            </label>

            <label>
              Recipe Image
              <input
                type="file"
                accept="image/*"
                onChange={handleShareImage}
              />
            </label>

            {shareForm.image && (
              <div className="share-image-preview">
                <img
                  src={shareForm.image}
                  alt="Recipe preview"
                />
              </div>
            )}

            {shareMessage && (
              <p className="auth-error">{shareMessage}</p>
            )}

            <div className="share-form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={openHome}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                Publish Recipe
              </button>
            </div>

          </form>
        </main>
      )}

      {/* ======================================
          RECIPE DETAILS POPUP
      ====================================== */}

      {selectedRecipe && (
        <div
          className="recipe-modal-backdrop"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="recipe-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              className="modal-close"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close recipe"
            >
              ×
            </button>

            {/* RECIPE IMAGE */}

            <img
              className="modal-recipe-image"
              src={selectedRecipe.image || "images/pizza.jpg"}
              alt={selectedRecipe.name}
              onError={(event) => {
                event.currentTarget.src = "images/pizza.jpg";
              }}
            />

            <div className="modal-recipe-content">

              {/* CATEGORY */}

              <p className="hero-eyebrow">
                {selectedRecipe.category}
              </p>

              {/* TITLE */}

              <h2>{selectedRecipe.name}</h2>

              <p>{selectedRecipe.description}</p>

              {/* TIME AND DIFFICULTY */}

              <div className="recipe-meta">
                <span>⏱ {selectedRecipe.time || "30 min"}</span>
                <span>🍳 {selectedRecipe.difficulty || "Easy"}</span>
              </div>

              {/* FAVOURITES */}

              <button
                className="favorite-button"
                onClick={() => toggleFavorite(selectedRecipe.id)}
              >
                {favorites.includes(selectedRecipe.id) ? "♥" : "♡"}
                {" "}
                {favorites.includes(selectedRecipe.id)
                  ? "Remove from Favourites"
                  : "Add to Favourites"}
              </button>

              {/* INGREDIENTS */}

              <h3>🥕 Ingredients</h3>

              <ul className="ingredient-list">
                {cleanRecipeItems(
                  selectedRecipe.ingredients
                ).map((ingredient, index) => (
                  <li key={`${selectedRecipe.id}-ingredient-${index}`}>
                    {ingredient}
                  </li>
                ))}
              </ul>

              {/* PREPARATION */}

              <h3>👩‍🍳 Preparation</h3>

              <ol className="instruction-list">
                {cleanRecipeItems(
                  selectedRecipe.instructions,
                  true
                ).map((instruction, index) => (
                  <li key={`${selectedRecipe.id}-step-${index}`}>
                    {instruction}
                  </li>
                ))}
              </ol>

              {/* REVIEWS */}

              <section className="review-section">

                <h3>⭐ Reviews and Ratings</h3>

                {selectedRecipeReviews.length === 0 ? (
                  <p>
                    No reviews yet. Be the first to review this recipe! ❤️
                  </p>
                ) : (
                  selectedRecipeReviews.map((review) => (
                    <div
                      className="review-item"
                      key={review.id}
                    >
                      <strong>{review.userName}</strong>

                      <p>{"★".repeat(review.rating)}</p>

                      <p>{review.comment}</p>

                      <small>{review.date}</small>
                    </div>
                  ))
                )}

                {/* REVIEW FORM */}

                <form
                  className="review-form"
                  onSubmit={submitReview}
                >

                  <label>
                    ⭐ Rate this Recipe

                    <select
                      value={reviewForm.rating}
                      onChange={(event) =>
                        setReviewForm((previous) => ({
                          ...previous,
                          rating: event.target.value,
                        }))
                      }
                    >
                      <option value="5">★★★★★ - 5</option>
                      <option value="4">★★★★ - 4</option>
                      <option value="3">★★★ - 3</option>
                      <option value="2">★★ - 2</option>
                      <option value="1">★ - 1</option>
                    </select>
                  </label>

                  <label>
                    Write Your Review

                    <textarea
                      value={reviewForm.comment}
                      onChange={(event) =>
                        setReviewForm((previous) => ({
                          ...previous,
                          comment: event.target.value,
                        }))
                      }
                      placeholder="Write your review..."
                      rows="3"
                    />
                  </label>

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    📝 Submit Review
                  </button>

                </form>
              </section>

            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} The Food Recipe. All rights reserved.
        </p>

        <p>Made with ♥ for food lovers.</p>
      </footer>

      {/* LOGIN AND SIGNUP POPUP */}

      {authMode && (
        <AuthModal
          initialTab={authMode}
          onClose={closeAuth}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}

    </div>
  );
}

export default App;

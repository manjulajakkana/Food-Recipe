import { useEffect, useMemo, useState } from "react";

import { recipes as initialRecipes } from "./data/recipes";
import AuthModal from "./components/AuthModal";
import AdminDashboard from "./components/AdminDashboard";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

// Admin login. Change the password here if you want a different one.
const ADMIN_USERNAME = "adminmanjula";
const ADMIN_PASSWORD = "Admin@123";

const emptyShareForm = {
  name: "",
  category: "",
  time: "",
  difficulty: "",
  image: "",
  ingredients: "",
  instructions: "",
};

const categoryButtons = [
  ["all", "All"],
  ["indian", "🇮🇳 Indian"],
  ["italian", "🇮🇹 Italian"],
  ["fastfood", "🍔 Fast Food"],
  ["dessert", "🍰 Desserts"],
  ["healthy", "🥗 Healthy"],
];

const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be full (very large images). Ignore.
  }
};

const toList = (value) =>
  Array.isArray(value)
    ? value
    : String(value || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

const addActivity = (action, user) => {
  const list = readStorage("foodRecipeActivities", []);
  list.unshift({ action, user, date: new Date().toLocaleString() });
  writeStorage("foodRecipeActivities", list.slice(0, 50));
};

const scrollToId = (id) => {
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, 50);
};

function App() {
  const [recipeList, setRecipeList] = useState(() =>
    readStorage("foodRecipeRecipesV3", initialRecipes)
  );
  const [favorites, setFavorites] = useState(() =>
    readStorage("favoriteRecipes", [])
  );
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = readStorage("registeredUsers", []);
    return Array.isArray(saved) ? saved : [];
  });
  const [reviews, setReviews] = useState(() => {
    const saved = readStorage("foodRecipeReviews", []);
    return Array.isArray(saved) ? saved : [];
  });
  const [currentUser, setCurrentUser] = useState(() =>
    readStorage("foodRecipeCurrentUser", null)
  );
  const [currentPage, setCurrentPage] = useState(() =>
    readStorage("foodRecipeCurrentUser", null)?.role === "admin"
      ? "admin"
      : "home"
  );

  const [selectedId, setSelectedId] = useState(null);
  const [showFavs, setShowFavs] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "enabled"
  );

  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCraving, setActiveCraving] = useState("");

  const [finderInput, setFinderInput] = useState("");
  const [finderQuery, setFinderQuery] = useState("");
  const [finderState, setFinderState] = useState("idle");

  const [shareForm, setShareForm] = useState(emptyShareForm);
  const [fileKey, setFileKey] = useState(0);

  /* ---------- SAVE TO LOCAL STORAGE ---------- */

  useEffect(() => writeStorage("foodRecipeRecipesV3", recipeList), [recipeList]);
  useEffect(() => writeStorage("favoriteRecipes", favorites), [favorites]);
  useEffect(() => writeStorage("registeredUsers", registeredUsers), [registeredUsers]);
  useEffect(() => writeStorage("foodRecipeReviews", reviews), [reviews]);

  useEffect(() => {
    if (currentUser) {
      writeStorage("foodRecipeCurrentUser", currentUser);
    } else {
      localStorage.removeItem("foodRecipeCurrentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    if (darkMode) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.removeItem("darkMode");
    }
  }, [darkMode]);

  /* ---------- AUTHENTICATION ---------- */

  const openLogin = () => setAuthMode("login");
  const closeAuth = () => setAuthMode(null);

  const handleLogin = (username, password) => {
    const cleanName = String(username || "").trim();

    if (!cleanName || !password) {
      return { success: false, message: "Please enter your username and password." };
    }

    if (cleanName.toLowerCase() === ADMIN_USERNAME.toLowerCase()) {
      if (password !== ADMIN_PASSWORD) {
        return { success: false, message: "Invalid username or password." };
      }

      setCurrentUser({
        id: "admin-user",
        name: ADMIN_USERNAME,
        username: ADMIN_USERNAME,
        role: "admin",
      });
      setCurrentPage("admin");
      setAuthMode(null);
      addActivity("Admin logged in", ADMIN_USERNAME);
      return { success: true, message: "Admin login successful!" };
    }

    const user = registeredUsers.find(
      (item) =>
        item.username?.toLowerCase() === cleanName.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid username or password." };
    }

    setCurrentUser({
      id: user.id,
      name: user.username,
      username: user.username,
      role: "user",
    });
    setCurrentPage("home");
    setAuthMode(null);
    addActivity("Logged in", user.username);
    return { success: true, message: "Login successful!" };
  };

  const handleSignup = (username, password) => {
    const cleanName = String(username || "").trim();

    if (!cleanName || !password) {
      return { success: false, message: "Please fill in all the fields." };
    }

    if (cleanName.length < 3) {
      return {
        success: false,
        message: "Username must contain at least 3 characters.",
      };
    }

    if (String(password).length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    const alreadyExists =
      cleanName.toLowerCase() === ADMIN_USERNAME.toLowerCase() ||
      registeredUsers.some(
        (user) => user.username?.toLowerCase() === cleanName.toLowerCase()
      );

    if (alreadyExists) {
      return { success: false, message: "This username is already taken." };
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      username: cleanName,
      password,
      role: "user",
    };

    setRegisteredUsers((previous) => [...previous, newUser]);

    setCurrentUser({
      id: newUser.id,
      name: newUser.username,
      username: newUser.username,
      role: "user",
    });

    setCurrentPage("home");
    setAuthMode(null);
    addActivity("Created an account", cleanName);
    return { success: true, message: "Account created successfully!" };
  };

  const handleLogout = () => {
    if (currentUser) addActivity("Logged out", currentUser.username);
    setCurrentUser(null);
    setCurrentPage("home");
    setSelectedId(null);
    setShowFavs(false);
    setAuthMode(null);
  };

  const openHome = () => {
    setCurrentPage("home");
    setSelectedId(null);
    setShowFavs(false);
    setSelectedCategory("all");
    setActiveCraving("");
    setSearchInput("");
    setSearchText("");
  };

  /* ---------- FAVORITES, REVIEWS, RATINGS ---------- */

  const toggleFavorite = (recipeId) => {
    setFavorites((previous) =>
      previous.includes(recipeId)
        ? previous.filter((id) => id !== recipeId)
        : [...previous, recipeId]
    );
  };

  const getRating = (recipe) => {
    const list = reviews.filter((review) => review.recipeId === recipe.id);
    const base = Number(recipe.rating) || 0;

    if (list.length === 0) return base.toFixed(1);

    const total = base + list.reduce((sum, r) => sum + Number(r.rating), 0);
    return (total / (list.length + 1)).toFixed(1);
  };

  const submitReview = (recipeId, rating, comment) => {
    if (!currentUser) {
      alert("Please login to submit a review.");
      openLogin();
      return false;
    }

    setReviews((previous) => [
      ...previous,
      {
        id: Date.now(),
        recipeId,
        userName: currentUser.username,
        rating: Number(rating),
        comment,
        date: new Date().toLocaleDateString(),
      },
    ]);

    addActivity("Reviewed a recipe", currentUser.username);
    return true;
  };

  /* ---------- RECIPE MANAGEMENT ---------- */

  const removeRecipe = (recipeId) => {
    setRecipeList((previous) =>
      previous.filter((recipe) => recipe.id !== recipeId)
    );
    setFavorites((previous) => previous.filter((id) => id !== recipeId));
    setReviews((previous) =>
      previous.filter((review) => review.recipeId !== recipeId)
    );
    setSelectedId((previous) => (previous === recipeId ? null : previous));
  };

  const handleDeleteSharedRecipe = (recipe) => {
    if (!currentUser) {
      openLogin();
      return;
    }

    if (recipe.sharedByUser !== currentUser.username) {
      alert("You can delete only recipes shared by your account.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
      return;
    }

    removeRecipe(recipe.id);
    addActivity(`Deleted the recipe "${recipe.name}"`, currentUser.username);
  };

  const handleDeleteRecipe = (recipeId) => {
    removeRecipe(recipeId);
    addActivity("Deleted a recipe", ADMIN_USERNAME);
  };

  const handleAddRecipe = (newRecipe) => {
    const recipeToAdd = {
      ...newRecipe,
      id: Date.now(),
      ingredients: toList(newRecipe.ingredients),
      instructions: toList(newRecipe.instructions),
      author: "Admin",
    };

    setRecipeList((previous) => [recipeToAdd, ...previous]);
    addActivity(`Added the recipe "${recipeToAdd.name}"`, ADMIN_USERNAME);
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipeList((previous) =>
      previous.map((recipe) =>
        recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
      )
    );
    addActivity(`Updated the recipe "${updatedRecipe.name}"`, ADMIN_USERNAME);
  };

  /* ---------- SHARE RECIPE ---------- */

  const handleShareInput = (event) => {
    const { name, value } = event.target;
    setShareForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleShareImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("❌ Please choose a valid image file.");
      setFileKey((key) => key + 1);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setShareForm((previous) => ({ ...previous, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submitSharedRecipe = (event) => {
    event.preventDefault();

    if (!currentUser) {
      alert("Please login to share a recipe.");
      openLogin();
      return;
    }

    if (!shareForm.image) {
      alert("📸 Please choose a recipe image.");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: shareForm.name.trim(),
      category: shareForm.category,
      craving: "",
      image: shareForm.image,
      rating: 5,
      time: shareForm.time.trim() || "30 min",
      difficulty: shareForm.difficulty,
      description: "A delicious recipe shared by our community.",
      ingredients: shareForm.ingredients.trim(),
      instructions: shareForm.instructions.trim(),
      author: currentUser.username,
      sharedBy: currentUser.username,
      sharedByUser: currentUser.username,
      isShared: true,
    };

    setRecipeList((previous) => [newRecipe, ...previous]);
    setShareForm(emptyShareForm);
    setFileKey((key) => key + 1);
    addActivity(`Shared the recipe "${newRecipe.name}"`, currentUser.username);

    alert("🎉 Your recipe has been shared successfully!");
    scrollToId("recipes");
  };

  /* ---------- SEARCH AND FILTERS ---------- */

  const runSearch = () => {
    setSearchText(searchInput.trim());
    setSelectedCategory("all");
    setActiveCraving("");
    scrollToId("recipes");
  };

  const visibleRecipes = useMemo(() => {
    const search = searchText.toLowerCase();

    return recipeList.filter((recipe) => {
      const matchesSearch =
        !search ||
        String(recipe.name || "").toLowerCase().includes(search) ||
        String(recipe.category || "").toLowerCase().includes(search) ||
        String(recipe.description || "").toLowerCase().includes(search);

      const category = String(recipe.category || "")
        .toLowerCase()
        .replace(/\s/g, "");

      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      const matchesCraving =
        !activeCraving ||
        String(recipe.craving || "").toLowerCase() === activeCraving;

      return matchesSearch && matchesCategory && matchesCraving;
    });
  }, [recipeList, searchText, selectedCategory, activeCraving]);

  const finderResults = useMemo(() => {
    const wanted = finderQuery
      .toLowerCase()
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (wanted.length === 0) return [];

    return recipeList
      .map((recipe) => {
        const have = toList(recipe.ingredients).map((item) =>
          item.toLowerCase()
        );
        const matched = wanted.filter((item) =>
          have.some((ingredient) => ingredient.includes(item))
        );
        return { recipe, matched };
      })
      .filter((item) => item.matched.length > 0)
      .sort((a, b) => b.matched.length - a.matched.length);
  }, [finderQuery, recipeList]);

  const runFinder = () => {
    if (!finderInput.trim()) {
      setFinderState("empty");
      return;
    }
    setFinderQuery(finderInput);
    setFinderState("done");
  };

  const handleCraving = (key) => {
    setActiveCraving(key);
    setSelectedCategory("all");
    setSearchInput("");
    setSearchText("");
    scrollToId("recipes");
  };

  const surpriseMe = () => {
    const random = recipeList[Math.floor(Math.random() * recipeList.length)];
    if (random) setSelectedId(random.id);
  };

  const selectedRecipe = recipeList.find((recipe) => recipe.id === selectedId);
  const favoriteRecipes = recipeList.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  /* ---------- ADMIN MODULE ---------- */

  const adminUser = {
    id: "admin-user",
    name: ADMIN_USERNAME,
    username: ADMIN_USERNAME,
    role: "admin",
  };

  if (currentPage === "admin" && currentUser?.role === "admin") {
    return (
      <AdminDashboard
        recipes={recipeList}
        registeredUsers={[adminUser, ...registeredUsers]}
        reviews={reviews}
        onAddRecipe={handleAddRecipe}
        onUpdateRecipe={handleUpdateRecipe}
        onDeleteRecipe={handleDeleteRecipe}
        onLogout={handleLogout}
        onHome={openHome}
      />
    );
  }

  /* ---------- USER MODULE (HOME PAGE) ---------- */

  return (
    <>
      <header>
        <div className="navbar">
          <a className="logo" href="#home">
            🍴 <span>The Food Recipe</span>
          </a>

          <nav>
            <a href="#home">Home</a>
            <a href="#recipes">Recipes</a>
            <a href="#share">Share Recipe</a>
          </nav>

          <div className="nav-actions">
            <button id="favoritesBtn" onClick={() => setShowFavs(true)}>
              ❤️ <span id="favoriteCount">{favorites.length}</span>
            </button>

            <button id="darkModeBtn" onClick={() => setDarkMode((value) => !value)}>
              {darkMode ? "☀️" : "🌙"}
            </button>

            {currentUser ? (
              <>
                <span className="user-pill">{currentUser.username}</span>
                <button className="logout-pill" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="login-pill" onClick={openLogin}>
                👤 Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <h1>
            Discover Food.
            <br />
            <span>Discover Happiness.</span>
          </h1>

          <p>
            Delicious recipes, irresistible flavours, and cooking inspiration —
            all in one place.
          </p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search for biryani, pizza, pasta..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
            />
            <button onClick={runSearch}>🔍 Search</button>
          </div>
        </section>

        {/* CRAVINGS */}
        <section className="section-container">
          <div className="cravings">
            <h2>What are you craving? 😋</h2>
            <p>Tell us what your taste buds want today.</p>

            <div className="craving-options">
              <button className="craving-option" onClick={() => handleCraving("spicy")}>
                🌶️ Spicy
              </button>
              <button className="craving-option" onClick={() => handleCraving("cheesy")}>
                🧀 Cheesy
              </button>
              <button className="craving-option" onClick={() => handleCraving("sweet")}>
                🍫 Sweet
              </button>
              <button className="craving-option" onClick={surpriseMe}>
                ✨ Surprise Me
              </button>
            </div>
          </div>
        </section>

        {/* INGREDIENT FINDER */}
        <section className="ingredient-finder">
          <div className="section-container">
            <div className="section-title">
              <h2>🥕 Find Recipes by Ingredients</h2>
              <p>Enter the ingredients you have and discover recipes you can make.</p>
            </div>

            <div className="ingredient-finder-box">
              <input
                type="text"
                placeholder="Example: chicken, onion, tomato"
                value={finderInput}
                onChange={(e) => setFinderInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runFinder()}
              />
              <button onClick={runFinder}>🔎 Find Recipes</button>
            </div>

            <p className="ingredient-help">
              💡 Enter multiple ingredients separated by commas.
            </p>

            <div className="ingredient-results">
              {finderState === "empty" && (
                <div className="ingredient-message">
                  <h3>🥕 Please enter some ingredients</h3>
                  <p>Example: chicken, onion, tomato</p>
                </div>
              )}

              {finderState === "done" && finderResults.length === 0 && (
                <div className="ingredient-message">
                  <h3>😔 No matching recipes found</h3>
                  <p>Try different ingredients.</p>
                </div>
              )}

              {finderState === "done" && finderResults.length > 0 && (
                <>
                  <h3 className="ingredient-result-title">🍽️ Recipes You Can Try</h3>

                  <div className="ingredient-result-grid">
                    {finderResults.map(({ recipe, matched }) => (
                      <div className="ingredient-recipe-card" key={recipe.id}>
                        <img src={recipe.image} alt={recipe.name} />

                        <div className="ingredient-recipe-info">
                          <h3>{recipe.name}</h3>
                          <p>⭐ {getRating(recipe)}</p>
                          <p>⏱ {recipe.time}</p>
                          <p className="matched-text">
                            ✓ Matching ingredients: {matched.join(", ")}
                          </p>
                          <button
                            className="recipe-btn"
                            onClick={() => setSelectedId(recipe.id)}
                          >
                            View Recipe →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* RECIPES */}
        <section className="section-container" id="recipes">
          <div className="section-title">
            <h2>Explore Delicious Recipes 🍽️</h2>
            <p>Find something delicious for every mood.</p>
          </div>

          <div className="categories">
            {categoryButtons.map(([value, label]) => (
              <button
                key={value}
                className={`category-btn ${
                  selectedCategory === value && !activeCraving ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(value);
                  setActiveCraving("");
                  setSearchInput("");
                  setSearchText("");
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="recipe-grid" id="recipeGrid">
            {visibleRecipes.length === 0 ? (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "50px",
                }}
              >
                <h2>😔 No recipes found</h2>
                <p>Try another search.</p>
              </div>
            ) : (
              visibleRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  rating={getRating(recipe)}
                  isFavorite={favorites.includes(recipe.id)}
                  isOwner={
                    !!currentUser &&
                    recipe.isShared &&
                    recipe.sharedByUser === currentUser.username
                  }
                  onToggleFavorite={toggleFavorite}
                  onView={setSelectedId}
                  onDelete={handleDeleteSharedRecipe}
                />
              ))
            )}
          </div>
        </section>

        {/* SHARE */}
        <section className="share-section" id="share">
          <div className="section-container">
            <div className="share-container">
              <h2>Share Your Recipe 👩‍🍳</h2>
              <p>Have a delicious recipe? Share it with our food-loving community!</p>

              <form id="recipeForm" onSubmit={submitSharedRecipe}>
                <label htmlFor="recipeName">Recipe Name</label>
                <input
                  id="recipeName"
                  name="name"
                  type="text"
                  placeholder="Example: Spicy Chicken Biryani"
                  value={shareForm.name}
                  onChange={handleShareInput}
                  required
                />

                <label htmlFor="recipeCuisine">Cuisine</label>
                <select
                  id="recipeCuisine"
                  name="category"
                  value={shareForm.category}
                  onChange={handleShareInput}
                  required
                >
                  <option value="" disabled>
                    Select Cuisine
                  </option>
                  <option value="indian">Indian</option>
                  <option value="italian">Italian</option>
                  <option value="fastfood">Fast Food</option>
                  <option value="dessert">Dessert</option>
                  <option value="healthy">Healthy</option>
                </select>

                <label htmlFor="recipeTime">Preparation Time</label>
                <input
                  id="recipeTime"
                  name="time"
                  type="text"
                  placeholder="Example: 30 min"
                  value={shareForm.time}
                  onChange={handleShareInput}
                  required
                />

                <label htmlFor="recipeDifficulty">Difficulty</label>
                <select
                  id="recipeDifficulty"
                  name="difficulty"
                  value={shareForm.difficulty}
                  onChange={handleShareInput}
                  required
                >
                  <option value="" disabled>
                    Select Difficulty
                  </option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                <label htmlFor="recipeImage">Recipe Image</label>
                <input
                  key={fileKey}
                  id="recipeImage"
                  type="file"
                  accept="image/*"
                  onChange={handleShareImage}
                />
                <p className="image-help">📷 Choose a food image from your computer.</p>

                <label htmlFor="recipeIngredients">Ingredients</label>
                <textarea
                  id="recipeIngredients"
                  name="ingredients"
                  placeholder="Write the ingredients here..."
                  value={shareForm.ingredients}
                  onChange={handleShareInput}
                  required
                />

                <label htmlFor="recipeInstructions">Preparation Instructions</label>
                <textarea
                  id="recipeInstructions"
                  name="instructions"
                  placeholder="Write the preparation steps here..."
                  value={shareForm.instructions}
                  onChange={handleShareInput}
                  required
                />

                <button type="submit" className="publish-btn">
                  🍴 Publish Recipe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} The Food Recipe. All rights reserved.</p>
        <p>Made with ❤️ for food lovers.</p>
      </footer>

      {/* RECIPE POPUP */}
      {selectedRecipe && (
        <RecipeModal
          key={selectedRecipe.id}
          recipe={selectedRecipe}
          rating={getRating(selectedRecipe)}
          reviews={reviews.filter((r) => r.recipeId === selectedRecipe.id)}
          onClose={() => setSelectedId(null)}
          onToggleFavorite={toggleFavorite}
          onSubmitReview={submitReview}
        />
      )}

      {/* FAVORITES POPUP */}
      {showFavs && (
        <div className="modal show" onClick={() => setShowFavs(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowFavs(false)}>
              ✕
            </button>

            <h2>❤️ My Favorites</h2>

            <div id="favoritesContent">
              {favoriteRecipes.length === 0 ? (
                <p style={{ marginTop: "20px" }}>
                  You haven't saved any recipes yet. ❤️
                </p>
              ) : (
                favoriteRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    style={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                      marginTop: "20px",
                      padding: "12px",
                      background: "#fff4eb",
                      borderRadius: "15px",
                    }}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />

                    <div>
                      <h3 style={{ marginTop: 0 }}>{recipe.name}</h3>
                      <p>⭐ {getRating(recipe)}</p>
                      <button
                        className="recipe-btn"
                        onClick={() => {
                          setShowFavs(false);
                          setSelectedId(recipe.id);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* LOGIN AND SIGNUP POPUP */}
      {authMode && (
        <AuthModal
          initialTab={authMode}
          onClose={closeAuth}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </>
  );
}

export default App;
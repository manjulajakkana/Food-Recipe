
import { useEffect, useState } from 'react';
import { recipes as initialRecipes } from './data/recipes';

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

import './App.css';

function readStorage(key, fallback) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
}

function initializeUsers() {
  const savedUsers = readStorage('registeredUsers', []);
  const users = Array.isArray(savedUsers) ? savedUsers : [];

  const adminExists = users.some(
    (user) => user.email === 'admin@foodrecipe.demo'
  );

  if (!adminExists) {
    users.push({
      id: 'admin-demo',
      name: 'Food Recipe Admin',
      email: 'admin@foodrecipe.demo',
      password: 'Admin@123',
      role: 'admin'
    });

    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }

  return users;
}

function App() {
  // RECIPES
  const [recipeList, setRecipeList] = useState(() =>
    readStorage('foodRecipeRecipes', initialRecipes)
  );

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // FAVORITES
  const [favorites, setFavorites] = useState(() =>
    readStorage('favoriteRecipes', [])
  );

  const [showFavorites, setShowFavorites] = useState(false);

  // REVIEWS
  const [reviews, setReviews] = useState(() =>
    readStorage('recipeReviews', {})
  );

  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  // AUTHENTICATION
  const [registeredUsers, setRegisteredUsers] = useState(
    () => initializeUsers()
  );

  const [currentUser, setCurrentUser] = useState(() =>
    readStorage('foodRecipeCurrentUser', null)
  );

  const [page, setPage] = useState('home');
  const [nextPage, setNextPage] = useState('dashboard');

  // SHARE RECIPE FORM
  const emptyRecipeForm = {
    name: '',
    description: '',
    category: 'Indian',
    image: '',
    ingredients: '',
    instructions: '',
    time: '',
    difficulty: 'Easy'
  };

  const [shareForm, setShareForm] = useState(emptyRecipeForm);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem('foodRecipeRecipes', JSON.stringify(recipeList));
  }, [recipeList]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recipeReviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        'foodRecipeCurrentUser',
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem('foodRecipeCurrentUser');
    }
  }, [currentUser]);

  // LOGIN
  function handleLogin(email, password) {
    const user = registeredUsers.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password.'
      };
    }

    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    setPage(nextPage);
    return { success: true };
  }

  // SIGNUP
  function handleSignup(name, email, password) {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (password.length < 6) {
      return {
        success: false,
        message: 'Password must contain at least 6 characters.'
      };
    }

    const emailExists = registeredUsers.some(
      (user) => user.email.toLowerCase() === cleanEmail
    );

    if (emailExists) {
      return {
        success: false,
        message: 'This email is already registered. Please login.'
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name: cleanName,
      email: cleanEmail,
      password,
      role: 'user'
    };

    setRegisteredUsers((previous) => [...previous, newUser]);

    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

    setPage(nextPage);
    return { success: true };
  }

  // LOGOUT
  function handleLogout() {
    setCurrentUser(null);
    setPage('home');
    setSelectedRecipe(null);
    setShowFavorites(false);
    alert('You have logged out successfully!');
  }

  // ADMIN RECIPE FUNCTIONS
  function handleAddRecipe(newRecipe) {
    setRecipeList((previous) => [
      ...previous,
      { ...newRecipe, id: Date.now() }
    ]);
  }

  function handleUpdateRecipe(id, updatedRecipe) {
    setRecipeList((previous) =>
      previous.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    );
  }

  function handleDeleteRecipe(id) {
    setRecipeList((previous) =>
      previous.filter((recipe) => recipe.id !== id)
    );

    setFavorites((previous) =>
      previous.filter((recipeId) => recipeId !== id)
    );

    setReviews((previous) => {
      const updated = { ...previous };
      delete updated[id];
      return updated;
    });

    setSelectedRecipe((previous) =>
      previous?.id === id ? null : previous
    );
  }

  // OPEN SHARE PAGE
  function openSharePage() {
    if (!currentUser) {
      setNextPage('share');
      setPage('login');
      return;
    }

    if (currentUser.role === 'admin') {
      alert('Please use a normal user account to share recipes.');
      return;
    }

    setPage('share');
  }

  // FORM INPUT
  function handleShareInput(event) {
    const { name, value } = event.target;

    setShareForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  // CHOOSE IMAGE FROM COMPUTER
  function handleImageSelection(event) {
    const file = event.target.files?.[0];

    setImageError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file.');
      event.target.value = '';
      return;
    }

    // Limit image size to 2 MB for Local Storage
    if (file.size > 2 * 1024 * 1024) {
      setImageError('Image must be smaller than 2 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      setShareForm((previous) => ({
        ...previous,
        image: imageData
      }));

      setImagePreview(imageData);
    };

    reader.onerror = () => {
      setImageError('Unable to read this image. Please try another file.');
    };

    reader.readAsDataURL(file);
  }

  // PUBLISH SHARED RECIPE
  function submitSharedRecipe(event) {
    event.preventDefault();

    if (!currentUser || currentUser.role !== 'user') {
      alert('Please login with a normal user account.');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: shareForm.name.trim(),
      description: shareForm.description.trim(),
      category: shareForm.category,
      image: shareForm.image || '',
      ingredients: shareForm.ingredients
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: shareForm.instructions.trim(),
      time: shareForm.time.trim(),
      difficulty: shareForm.difficulty,
      rating: 'Not rated',
      sharedBy: currentUser.name,
      sharedByEmail: currentUser.email,
      isShared: true
    };

    if (
      !newRecipe.name ||
      !newRecipe.description ||
      !newRecipe.ingredients.length ||
      !newRecipe.instructions ||
      !newRecipe.time
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    setRecipeList((previous) => [...previous, newRecipe]);

    setShareForm(emptyRecipeForm);
    setImagePreview('');
    setImageError('');
    setSelectedCategory('All');
    setSearch('');
    setShowFavorites(false);
    setPage('home');

    alert('Your recipe has been shared successfully!');
  }

  // DELETE OWN SHARED RECIPE
  function deleteSharedRecipe(recipe) {
    if (!currentUser || !recipe.isShared) return;

    if (recipe.sharedByEmail !== currentUser.email) {
      alert('You can only delete recipes shared by your account.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.name}"?`
    );

    if (!confirmed) return;

    handleDeleteRecipe(recipe.id);

    alert('Your shared recipe has been deleted.');
  }

  // CATEGORIES
  const categories = [
    'All',
    ...new Set(
      recipeList.map((recipe) => recipe.category || 'Other')
    )
  ];

  // FAVORITES
  function toggleFavorite(recipeId) {
    setFavorites((previous) =>
      previous.includes(recipeId)
        ? previous.filter((id) => id !== recipeId)
        : [...previous, recipeId]
    );
  }

  // REVIEWS
  function submitReview(event) {
    event.preventDefault();

    if (!selectedRecipe || !reviewText.trim()) {
      alert('Please write a review before submitting.');
      return;
    }

    const recipeId = selectedRecipe.id;

    const newReview = {
      id: Date.now(),
      rating: Number(reviewRating),
      comment: reviewText.trim(),
      date: new Date().toLocaleDateString()
    };

    setReviews((previous) => ({
      ...previous,
      [recipeId]: [
        ...(previous[recipeId] || []),
        newReview
      ]
    }));

    setReviewText('');
    setReviewRating(5);

    alert('Your review has been submitted successfully!');
  }

  // SEARCH AND FILTER
  const filteredRecipes = recipeList.filter((recipe) => {
    const searchText = search.toLowerCase();

    const name = String(recipe.name || '').toLowerCase();
    const description = String(recipe.description || '').toLowerCase();

    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join(' ').toLowerCase()
      : String(recipe.ingredients || '').toLowerCase();

    const category = String(recipe.category || 'Other');

    return (
      (
        name.includes(searchText) ||
        description.includes(searchText) ||
        ingredients.includes(searchText)
      ) &&
      (
        selectedCategory === 'All' ||
        category === selectedCategory
      ) &&
      (
        !showFavorites ||
        favorites.includes(recipe.id)
      )
    );
  });

  // IMAGE PATH
  function getImagePath(image) {
    if (!image) return '/images/placeholder.jpg';

    if (
      image.startsWith('http://') ||
      image.startsWith('https://') ||
      image.startsWith('data:')
    ) {
      return image;
    }

    return image.startsWith('/') ? image : '/' + image;
  }

  // SELECTED RECIPE REVIEWS
  const selectedReviews = selectedRecipe
    ? reviews[selectedRecipe.id] || []
    : [];

  const averageRating = selectedReviews.length
    ? (
        selectedReviews.reduce(
          (total, review) => total + review.rating,
          0
        ) / selectedReviews.length
      ).toFixed(1)
    : null;

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h1>🍴 The Food Recipe</h1>
        <p>Discover delicious recipes and cooking inspiration!</p>

        <div className="header-actions">
          <button
            className="auth-nav-button"
            onClick={() => setPage('home')}
          >
            Home
          </button>

          {currentUser ? (
            <>
              {currentUser.role === 'user' && (
                <button
                  className="auth-nav-button"
                  onClick={openSharePage}
                >
                  ➕ Share Your Recipe
                </button>
              )}

              <button
                className="auth-nav-button"
                onClick={() => setPage('dashboard')}
              >
                My Dashboard
              </button>

              <button
                className="auth-nav-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="auth-nav-button"
                onClick={() => {
                  setNextPage('dashboard');
                  setPage('login');
                }}
              >
                Login
              </button>

              <button
                className="auth-nav-button"
                onClick={() => {
                  setNextPage('dashboard');
                  setPage('signup');
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {/* LOGIN */}
      {page === 'login' && !currentUser && (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setPage('signup')}
        />
      )}

      {/* SIGNUP */}
      {page === 'signup' && !currentUser && (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setPage('login')}
        />
      )}

      {/* DASHBOARD */}
      {page === 'dashboard' && currentUser && (
        currentUser.role === 'admin' ? (
          <AdminDashboard
            recipes={recipeList}
            registeredUsers={registeredUsers}
            reviews={reviews}
            onAddRecipe={handleAddRecipe}
            onUpdateRecipe={handleUpdateRecipe}
            onDeleteRecipe={handleDeleteRecipe}
          />
        ) : (
          <Dashboard
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )
      )}

      {/* SHARE RECIPE PAGE */}
      {page === 'share' && currentUser?.role === 'user' && (
        <main className="main">
          <div className="share-recipe-container">

            <h2>🍲 Share Your Recipe</h2>

            <p>Share your favorite homemade dish with everyone!</p>

            <form
              onSubmit={submitSharedRecipe}
              className="share-recipe-form"
            >
              <label>Recipe Name *</label>
              <input
                name="name"
                value={shareForm.name}
                onChange={handleShareInput}
                placeholder="Enter recipe name"
                required
              />

              <label>Description *</label>
              <textarea
                name="description"
                value={shareForm.description}
                onChange={handleShareInput}
                placeholder="Write a short description"
                required
              />

              <label>Category</label>
              <select
                name="category"
                value={shareForm.category}
                onChange={handleShareInput}
              >
                <option>Indian</option>
                <option>South Indian</option>
                <option>North Indian</option>
                <option>Chinese</option>
                <option>Italian</option>
                <option>Mexican</option>
                <option>Dessert</option>
                <option>Breakfast</option>
                <option>Snacks</option>
                <option>Other</option>
              </select>

              {/* IMAGE FILE PICKER */}
              <label htmlFor="recipe-image">
                Choose Recipe Image
              </label>

              <input
                id="recipe-image"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageSelection}
              />

              <small>
                Choose a JPG, PNG, or WEBP image from your computer.
                Maximum file size: 2 MB.
              </small>

              {imageError && (
                <p className="image-error">{imageError}</p>
              )}

              {imagePreview && (
                <div className="image-preview-container">
                  <p>Selected Image Preview:</p>

                  <img
                    src={imagePreview}
                    alt="Selected recipe preview"
                    className="share-image-preview"
                  />

                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => {
                      setImagePreview('');
                      setShareForm((previous) => ({
                        ...previous,
                        image: ''
                      }));

                      const input = document.getElementById('recipe-image');
                      if (input) input.value = '';
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}

              <label>Cooking Time *</label>
              <input
                name="time"
                value={shareForm.time}
                onChange={handleShareInput}
                placeholder="Example: 30 minutes"
                required
              />

              <label>Difficulty</label>
              <select
                name="difficulty"
                value={shareForm.difficulty}
                onChange={handleShareInput}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <label>Ingredients * (one ingredient per line)</label>
              <textarea
                name="ingredients"
                value={shareForm.ingredients}
                onChange={handleShareInput}
                rows="5"
                placeholder={'2 cups rice\n1 onion\n1 tomato\nSpices'}
                required
              />

              <label>Preparation Instructions *</label>
              <textarea
                name="instructions"
                value={shareForm.instructions}
                onChange={handleShareInput}
                rows="6"
                placeholder="Write the preparation steps..."
                required
              />

              <button type="submit" className="share-main-button">
                Publish Recipe
              </button>

              <button
                type="button"
                className="share-cancel-button"
                onClick={() => setPage('home')}
              >
                Cancel
              </button>
            </form>
          </div>
        </main>
      )}

      {/* HOMEPAGE */}
      {(page === 'home' ||
        (page === 'dashboard' && currentUser?.role !== 'admin')) && (
        <main className="main">
          {/* HERO SECTION */}
          <section className="hero-section">
            <h2 className="hero-title">
              Discover Food.
              <span>Discover Happiness.</span>
            </h2>
            <p className="hero-description">
              Delicious recipes, irresistible flavours, and cooking inspiration — all in one place.
            </p>

            <div className="hero-search-wrapper">
              <input
                type="text"
                className="search-box"
                placeholder="Search for biryani, pizza, pasta..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button
                type="button"
                className="hero-search-button"
                onClick={() => document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🔍 Search
              </button>
            </div>

            <div className="craving-section">
              <h2>What are you craving? 😊</h2>
              <p>Tell us what your taste buds want today.</p>
              <div className="craving-options">
                <button type="button" onClick={() => { setSearch('spicy'); setSelectedCategory('All'); setShowFavorites(false); }}>🌶️ Spicy</button>
                <button type="button" onClick={() => { setSearch('cheese'); setSelectedCategory('All'); setShowFavorites(false); }}>🧀 Cheesy</button>
                <button type="button" onClick={() => { setSearch('sweet'); setSelectedCategory('All'); setShowFavorites(false); }}>🍫 Sweet</button>
                <button type="button" onClick={() => { setSearch(''); setSelectedCategory('All'); setShowFavorites(false); }}>✨ Surprise Me</button>
              </div>
            </div>

            <div className="share-recipe-banner">
              <h2>🍲 Have a Recipe to Share?</h2>
              <p>Share your favorite homemade dishes with our food community!</p>
              <button type="button" className="share-main-button" onClick={openSharePage}>
                ➕ SHARE YOUR RECIPE
              </button>
              {!currentUser && <p className="share-login-note">Login or sign up to publish your recipe.</p>}
            </div>
          </section>

          <section id="recipes-section" className="recipes-section">
            <h2>Explore Our Delicious Recipes</h2>
            <p className="recipes-subtitle">Find your favorite dishes and discover something new.</p>
          </section>

          {/* CATEGORY FILTER */}
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category ? 'active' : ''
                }
                onClick={() => {
                  setSelectedCategory(category);
                  setShowFavorites(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAVORITES */}
          <div className="favorites-filter">
            <button
              className={showFavorites ? 'active' : ''}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              ❤️ {showFavorites ? 'Show All Recipes' : 'My Favorites'}
              {' '}({favorites.length})
            </button>
          </div>

          {/* RECIPE CARDS */}
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div className="recipe-card" key={recipe.id}>

                  <img
                    src={getImagePath(recipe.image)}
                    alt={recipe.name || 'Recipe'}
                  />

                  <div className="recipe-info">
                    <h3>{recipe.name || 'Unnamed Recipe'}</h3>

                    {recipe.isShared && (
                      <p className="shared-by-label">
                        👤 Shared by {recipe.sharedBy}
                      </p>
                    )}

                    <p>
                      {recipe.description || 'No description available.'}
                    </p>

                    <p>⭐ {recipe.rating ?? 'Not rated'}</p>
                    <p>⏱️ {recipe.time || 'Not specified'}</p>

                    <p>
                      Difficulty: {recipe.difficulty || 'Not specified'}
                    </p>

                    <div className="recipe-actions">
                      <button
                        className="view-button"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        View Recipe
                      </button>

                      <button
                        className={`favorite-button ${
                          favorites.includes(recipe.id) ? 'favorited' : ''
                        }`}
                        onClick={() => toggleFavorite(recipe.id)}
                      >
                        {favorites.includes(recipe.id) ? '❤️' : '🤍'}
                      </button>
                    </div>

                    {/* DELETE BUTTON FOR RECIPE OWNER */}
                    {recipe.isShared &&
                      currentUser?.role === 'user' &&
                      recipe.sharedByEmail === currentUser.email && (
                        <button
                          className="delete-shared-button"
                          onClick={() => deleteSharedRecipe(recipe)}
                        >
                          🗑️ Delete My Recipe
                        </button>
                      )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-recipes">
                {showFavorites
                  ? 'You have not added any favorites yet.'
                  : 'No recipes found. Try another search!'}
              </p>
            )}
          </div>

          {/* RECIPE DETAILS */}
          {selectedRecipe && (
            <div className="recipe-overlay">
              <div className="recipe-details">

                <button
                  className="close-button"
                  onClick={() => setSelectedRecipe(null)}
                >
                  ✕
                </button>

                <h2>{selectedRecipe.name}</h2>

                <img
                  src={getImagePath(selectedRecipe.image)}
                  alt={selectedRecipe.name}
                />

                {selectedRecipe.isShared && (
                  <p>Shared by: {selectedRecipe.sharedBy}</p>
                )}

                <h3>Ingredients</h3>

                <p className="recipe-text">
                  {Array.isArray(selectedRecipe.ingredients)
                    ? selectedRecipe.ingredients.join('\n')
                    : selectedRecipe.ingredients || 'No ingredients available.'}
                </p>

                <h3>Cooking Instructions</h3>

                <p className="recipe-text">
                  {selectedRecipe.instructions || 'No instructions available.'}
                </p>

                <hr />

                {/* RATINGS AND REVIEWS */}
                <h2>⭐ Ratings and Reviews</h2>

                {selectedReviews.length > 0 ? (
                  <>
                    <p>
                      Average rating: <strong>{averageRating} / 5</strong>
                    </p>

                    {selectedReviews.map((review) => (
                      <div className="review-card" key={review.id}>
                        <p className="review-stars">
                          {'⭐'.repeat(review.rating)}
                        </p>

                        <p>{review.comment}</p>
                        <small>{review.date}</small>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>
                    No reviews yet. Be the first to review this recipe!
                  </p>
                )}

                <h3>Write Your Review</h3>

                <form onSubmit={submitReview} className="review-form">
                  <label htmlFor="rating">Select your rating:</label>

                  <select
                    id="rating"
                    value={reviewRating}
                    onChange={(event) => setReviewRating(event.target.value)}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>

                  <label htmlFor="review">Write your review:</label>

                  <textarea
                    id="review"
                    rows="4"
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                    required
                  />

                  <button type="submit" className="submit-review">
                    Submit Review
                  </button>
                </form>

                {selectedRecipe.isShared &&
                  currentUser?.role === 'user' &&
                  selectedRecipe.sharedByEmail === currentUser.email && (
                    <button
                      className="delete-shared-button"
                      onClick={() => deleteSharedRecipe(selectedRecipe)}
                    >
                      🗑️ Delete My Recipe
                    </button>
                  )}

                <button
                  className="close-details"
                  onClick={() => setSelectedRecipe(null)}
                >
                  Close Recipe
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 The Food Recipe. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

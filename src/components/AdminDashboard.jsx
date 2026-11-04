
import { useState } from 'react';

function AdminDashboard({
  recipes,
  registeredUsers,
  reviews,
  onAddRecipe,
  onUpdateRecipe,
  onDeleteRecipe
}) {
  const [activeTab, setActiveTab] = useState('recipes');
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const emptyForm = {
    name: '',
    description: '',
    category: 'Breakfast',
    image: '',
    ingredients: '',
    instructions: '',
    time: '',
    difficulty: 'Easy',
    rating: 0
  };

  const [form, setForm] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const recipeData = {
      ...form,
      ingredients: form.ingredients
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      rating: Number(form.rating),
      time: form.time.trim()
    };

    if (
      !recipeData.name.trim() ||
      !recipeData.description.trim() ||
      !recipeData.ingredients.length ||
      !recipeData.instructions.trim()
    ) {
      setMessage('Please fill in all required recipe details.');
      return;
    }

    if (editingId !== null) {
      onUpdateRecipe(editingId, recipeData);
      setMessage('Recipe updated successfully!');
    } else {
      onAddRecipe(recipeData);
      setMessage('New recipe added successfully!');
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(recipe) {
    setEditingId(recipe.id);

    setForm({
      name: recipe.name || '',
      description: recipe.description || '',
      category: recipe.category || 'Breakfast',
      image: recipe.image || '',
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(', ')
        : recipe.ingredients || '',
      instructions: recipe.instructions || '',
      time: recipe.time || '',
      difficulty: recipe.difficulty || 'Easy',
      rating: recipe.rating ?? 0
    });

    setActiveTab('recipes');
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage('');
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe?'
    );

    if (confirmed) {
      onDeleteRecipe(id);
      setMessage('Recipe deleted successfully!');

      if (editingId === id) {
        cancelEdit();
      }
    }
  }

  const allReviews = Object.entries(reviews || {}).flatMap(
    ([recipeId, recipeReviews]) =>
      (Array.isArray(recipeReviews) ? recipeReviews : []).map(
        (review) => ({
          ...review,
          recipeId
        })
      )
  );

  return (
    <div className="admin-dashboard">

      <div className="admin-heading">
        <h1>⚙️ Admin Dashboard</h1>
        <p>Manage your FOOD RECIPE application.</p>
      </div>

      {/* ADMIN NAVIGATION */}
      <div className="admin-tabs">

        <button
          className={activeTab === 'recipes' ? 'active' : ''}
          onClick={() => setActiveTab('recipes')}
        >
          🍽️ Manage Recipes
        </button>

        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 Registered Users
        </button>

        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          ⭐ Reviews
        </button>

      </div>

      {/* DASHBOARD SUMMARY */}
      <div className="admin-stats">

        <div className="admin-stat-card">
          <h2>{recipes.length}</h2>
          <p>Total Recipes</p>
        </div>

        <div className="admin-stat-card">
          <h2>{registeredUsers.filter(
            (user) => user.role === 'user'
          ).length}</h2>
          <p>Registered Users</p>
        </div>

        <div className="admin-stat-card">
          <h2>{allReviews.length}</h2>
          <p>Total Reviews</p>
        </div>

      </div>

      {/* RECIPE MANAGEMENT */}
      {activeTab === 'recipes' && (
        <section className="admin-section">

          <h2>
            {editingId !== null ? 'Edit Recipe' : 'Add New Recipe'}
          </h2>

          <form
            className="admin-recipe-form"
            onSubmit={handleSubmit}
          >

            <label>Recipe Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter recipe name"
              required
            />

            <label>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter recipe description"
              required
            />

            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
              <option>Desserts</option>
              <option>Drinks</option>
              <option>Other</option>
            </select>

            <label>Image Path</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="/images/recipe.jpg"
            />

            <small>
              Add an image inside public/images and enter its path,
              for example /images/pasta.jpg.
            </small>

            <label>Ingredients *</label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              placeholder="Enter ingredients separated by commas"
              required
            />

            <label>Cooking Instructions *</label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Enter cooking instructions"
              required
            />

            <label>Cooking Time</label>
            <input
              name="time"
              value={form.time}
              onChange={handleChange}
              placeholder="Example: 30 minutes"
            />

            <label>Difficulty</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <label>Rating</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={handleChange}
            />

            <div className="admin-form-actions">

              <button type="submit" className="admin-save-button">
                {editingId !== null ? 'Update Recipe' : 'Add Recipe'}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

            </div>

            {message && (
              <p className="admin-message">{message}</p>
            )}

          </form>

          <h2>All Recipes ({recipes.length})</h2>

          <div className="admin-recipe-list">

            {recipes.map((recipe) => (
              <div className="admin-recipe-item" key={recipe.id}>

                <div>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.category || 'Other'}</p>
                </div>

                <div className="admin-item-actions">

                  <button
                    className="admin-edit-button"
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-delete-button"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

            {recipes.length === 0 && (
              <p>No recipes available.</p>
            )}

          </div>

        </section>
      )}

      {/* REGISTERED USERS */}
      {activeTab === 'users' && (
        <section className="admin-section">

          <h2>Registered Users</h2>

          <div className="admin-table-wrapper">
            <table className="admin-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {registeredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </section>
      )}

      {/* REVIEWS */}
      {activeTab === 'reviews' && (
        <section className="admin-section">

          <h2>Customer Reviews</h2>

          {allReviews.length > 0 ? (
            allReviews.map((review) => {
              const recipe = recipes.find(
                (item) => String(item.id) === String(review.recipeId)
              );

              return (
                <div className="admin-review-item" key={review.id}>

                  <h3>{recipe?.name || 'Recipe'}</h3>

                  <p>{'⭐'.repeat(review.rating)}</p>

                  <p>{review.comment}</p>

                  <small>{review.date}</small>

                </div>
              );
            })
          ) : (
            <p>No customer reviews available.</p>
          )}

        </section>
      )}

    </div>
  );
}

export default AdminDashboard;

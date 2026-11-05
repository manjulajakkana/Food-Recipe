import { useMemo, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  category: "Indian",
  craving: "Spicy",
  time: "",
  difficulty: "Easy",
  rating: "4.5",
  image: "",
  ingredients: "",
  instructions: ""
};

function AdminDashboard({
  recipes = [],
  registeredUsers = [],
  reviews = [],
  onAddRecipe,
  onUpdateRecipe,
  onDeleteRecipe,
  onLogout,
  onHome
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("foodRecipeCurrentUser") || "null"
  );

  const username =
    currentUser?.name ||
    currentUser?.username ||
    currentUser?.email?.split("@")[0] ||
    "Admin";

  const favorites = JSON.parse(
    localStorage.getItem("favoriteRecipes") || "[]"
  );

  const shoppingItems = JSON.parse(
    localStorage.getItem("shoppingList") || "[]"
  );

  const activities = JSON.parse(
    localStorage.getItem("foodRecipeActivities") || "[]"
  );

  const sharedRecipes = recipes.filter((recipe) => {
    const author = String(recipe.author || "").toLowerCase();
    return author !== "admin" && author !== "";
  });

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) =>
      String(recipe.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [recipes, search]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function editRecipe(recipe) {
    setEditingId(recipe.id);

    setForm({
      name: recipe.name || "",
      description: recipe.description || "",
      category: recipe.category || "Indian",
      craving: recipe.craving || "Spicy",
      time: recipe.time || "",
      difficulty: recipe.difficulty || "Easy",
      rating: String(recipe.rating || 4.5),
      image: recipe.image || "",
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join("\n")
        : recipe.ingredients || "",
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions.join("\n")
        : recipe.instructions || ""
    });

    setMessage("Editing " + recipe.name);
    setActiveTab("recipes");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const ingredients = form.ingredients
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    const instructions = form.instructions
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      ingredients.length === 0 ||
      instructions.length === 0
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const recipeData = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      craving: form.craving,
      time: form.time.trim() || "30 min",
      difficulty: form.difficulty,
      rating: Number(form.rating),
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=1000",
      ingredients,
      instructions,
      author: "Admin"
    };

    try {
      if (editingId !== null) {
        onUpdateRecipe?.({
          ...recipeData,
          id: editingId
        });

        setMessage("Recipe updated successfully!");
      } else {
        onAddRecipe?.({
          ...recipeData,
          id: `admin-${Date.now()}`
        });

        setMessage("Recipe added successfully!");
      }

      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setMessage("Unable to save recipe. Please try again.");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteRecipe(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) return;

    onDeleteRecipe?.(id);
    setMessage("Recipe deleted successfully!");
  }

  function refreshDashboard() {
    window.location.reload();
  }

  function openWebsite() {
    if (onHome) {
      onHome();
    } else {
      window.location.href = "/";
    }
  }

  function exportData() {
    const data = {
      recipes,
      registeredUsers,
      reviews,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "food-recipe-admin-data.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  function logout() {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("foodRecipeCurrentUser");
      window.location.href = "/";
    }
  }

  return (
    <div className="fr-admin">

      <style>{`
        .fr-admin {
          min-height: 100vh;
          background: #fffaf6;
          color: #342c28;
          font-family: Arial, sans-serif;
          padding-bottom: 35px;
        }

        .fr-admin * {
          box-sizing: border-box;
        }

        .fr-admin-nav {
          height: 72px;
          padding: 0 4%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 3px 15px rgba(0,0,0,.06);
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .fr-admin-brand {
          color: #f45b35;
          font-size: 21px;
          font-weight: 800;
        }

        .fr-admin-nav-right {
          display: flex;
          align-items: center;
          gap: 18px;
          color: #81756e;
          font-size: 14px;
          font-weight: 600;
        }

        .fr-admin button {
          cursor: pointer;
          font-family: inherit;
        }

        .fr-admin-logout {
          background: #f45b35;
          border: none;
          color: white;
          border-radius: 25px;
          padding: 11px 23px;
          font-weight: 700;
        }

        .fr-admin-main {
          max-width: 1250px;
          width: 92%;
          margin: 38px auto;
        }

        .fr-admin-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 27px;
        }

        .fr-admin-heading h1 {
          font-size: 32px;
          margin: 0 0 8px;
          color: #342c28;
        }

        .fr-admin-heading p {
          color: #8a7d75;
          margin: 0;
          font-size: 15px;
        }

        .fr-admin-status {
          padding: 10px 16px;
          background: white;
          border: 1px solid #eee1d9;
          border-radius: 25px;
          font-size: 13px;
          white-space: nowrap;
        }

        .fr-admin-status span {
          color: #28a45c;
          margin-right: 6px;
        }

        .fr-admin-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .fr-admin-stat {
          min-height: 100px;
          background: white;
          border: 1px solid #eee3dc;
          border-radius: 16px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 7px 18px rgba(60,40,20,.05);
        }

        .fr-admin-stat-icon {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #ffebe4;
          border-radius: 14px;
          font-size: 23px;
        }

        .fr-admin-stat small {
          display: block;
          color: #847870;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .fr-admin-stat strong {
          display: block;
          font-size: 25px;
          color: #292421;
        }

        .fr-admin-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 28px 0 20px;
        }

        .fr-admin-tabs button {
          background: white;
          border: 1px solid #eddfd7;
          color: #61564f;
          padding: 12px 19px;
          border-radius: 9px;
          font-weight: 700;
          font-size: 14px;
        }

        .fr-admin-tabs button.active {
          background: #f45b35;
          border-color: #f45b35;
          color: white;
        }

        .fr-admin-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 22px;
        }

        .fr-admin-card {
          background: white;
          border: 1px solid #eee3dc;
          border-radius: 18px;
          padding: 23px;
          box-shadow: 0 7px 20px rgba(60,40,20,.05);
          min-width: 0;
          margin-bottom: 20px;
        }

        .fr-admin-card h3 {
          font-size: 17px;
          margin: 0 0 7px;
        }

        .fr-admin-card-subtitle {
          color: #92847c;
          font-size: 13px;
          margin: 0 0 18px;
        }

        .fr-admin-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .fr-admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          text-align: left;
        }

        .fr-admin-table th {
          background: #ffebe4;
          padding: 14px;
          color: #413731;
        }

        .fr-admin-table td {
          padding: 14px;
          border-bottom: 1px solid #f1e8e2;
          color: #6c6059;
        }

        .fr-admin-table tr:last-child td {
          border-bottom: none;
        }

        .fr-admin-pill {
          display: inline-block;
          background: #ffebe4;
          color: #f05b35;
          padding: 5px 11px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .fr-admin-empty {
          text-align: center;
          padding: 35px 12px;
          color: #94877f;
          font-size: 14px;
        }

        .fr-admin-empty span {
          display: block;
          font-size: 27px;
          margin-bottom: 12px;
        }

        .fr-admin-data-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .fr-admin-data-item {
          background: #fffaf7;
          border: 1px solid #f0e4dc;
          border-radius: 13px;
          padding: 17px;
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .fr-admin-data-item > span {
          font-size: 24px;
        }

        .fr-admin-data-item small {
          display: block;
          color: #8a7d75;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .fr-admin-data-item strong {
          font-size: 14px;
        }

        .fr-admin-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .fr-admin-actions button {
          border: none;
          border-radius: 11px;
          padding: 14px 19px;
          background: #f45b35;
          color: white;
          font-weight: 700;
          font-size: 13px;
        }

        .fr-admin-actions button:hover,
        .fr-admin-logout:hover {
          background: #d94725;
        }

        .fr-admin-form {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .fr-admin-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .fr-admin-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #514943;
          font-size: 13px;
          font-weight: 700;
          min-width: 0;
        }

        .fr-admin-form input,
        .fr-admin-form select,
        .fr-admin-form textarea,
        .fr-admin-search {
          width: 100%;
          min-width: 0;
          padding: 12px 14px;
          border: 1px solid #e7dcd4;
          border-radius: 9px;
          background: #fffaf7;
          color: #342c28;
          font-size: 14px;
          outline: none;
        }

        .fr-admin-form input:focus,
        .fr-admin-form select:focus,
        .fr-admin-form textarea:focus,
        .fr-admin-search:focus {
          border-color: #f45b35;
        }

        .fr-admin-form textarea {
          resize: vertical;
          line-height: 1.5;
        }

        .fr-admin-form-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .fr-admin-primary,
        .fr-admin-secondary {
          border: none;
          border-radius: 9px;
          padding: 12px 20px;
          font-weight: 700;
        }

        .fr-admin-primary {
          background: #f45b35;
          color: white;
        }

        .fr-admin-secondary {
          background: #eee8e3;
          color: #514943;
        }

        .fr-admin-message {
          padding: 12px;
          background: #eaf8ed;
          color: #24733b;
          border-radius: 8px;
          font-size: 13px;
        }

        .fr-admin-search {
          max-width: 400px;
          margin-bottom: 18px;
        }

        .fr-admin-recipe-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid #f0e8e2;
        }

        .fr-admin-recipe-row img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 9px;
          background: #f3ebe5;
        }

        .fr-admin-recipe-info {
          flex: 1;
          min-width: 0;
        }

        .fr-admin-recipe-info strong {
          display: block;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .fr-admin-recipe-info small {
          color: #8a7d75;
          font-size: 12px;
        }

        .fr-admin-row-buttons {
          display: flex;
          gap: 7px;
        }

        .fr-admin-row-buttons button {
          border: none;
          padding: 8px 11px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
        }

        .fr-admin-edit {
          background: #fff0e8;
          color: #e6532d;
        }

        .fr-admin-delete {
          background: #ffe9e9;
          color: #d13e3e;
        }

        .fr-admin-review {
          padding: 15px;
          border: 1px solid #eee3dc;
          border-radius: 12px;
          margin-bottom: 12px;
          background: #fffdfb;
        }

        .fr-admin-review strong {
          font-size: 14px;
        }

        .fr-admin-review p {
          color: #71655e;
          line-height: 1.5;
          font-size: 13px;
        }

        .fr-admin-review small {
          color: #94877f;
        }

        .fr-admin-activity {
          padding: 15px;
          background: #fffaf7;
          border: 1px solid #f0e4dc;
          border-radius: 11px;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .fr-admin-footer {
          text-align: center;
          color: #968981;
          font-size: 13px;
          padding: 25px 10px 0;
          border-top: 1px solid #f0e5de;
          margin-top: 45px;
        }

        @media(max-width: 1050px) {
          .fr-admin-stats {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .fr-admin-data-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media(max-width: 700px) {
          .fr-admin-main {
            width: 94%;
            margin: 25px auto;
          }

          .fr-admin-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .fr-admin-heading h1 {
            font-size: 26px;
          }

          .fr-admin-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .fr-admin-grid {
            grid-template-columns: 1fr;
          }

          .fr-admin-form-grid {
            grid-template-columns: 1fr;
          }

          .fr-admin-nav {
            padding: 0 4%;
          }

          .fr-admin-brand {
            font-size: 16px;
          }

          .fr-admin-nav-right {
            gap: 8px;
            font-size: 11px;
          }

          .fr-admin-logout {
            padding: 9px 13px;
          }
        }

        @media(max-width: 430px) {
          .fr-admin-stats {
            grid-template-columns: 1fr;
          }

          .fr-admin-data-grid {
            grid-template-columns: 1fr;
          }

          .fr-admin-row-buttons {
            flex-direction: column;
          }

          .fr-admin-recipe-row {
            flex-wrap: wrap;
          }

          .fr-admin-actions button {
            width: 100%;
          }
        }
      `}</style>

      {/* TOP NAVIGATION */}
      <header className="fr-admin-nav">
        <div className="fr-admin-brand">
          🍴 The Food Recipe
        </div>

        <div className="fr-admin-nav-right">
          <span>Welcome, {username}</span>
          <button
            className="fr-admin-logout"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="fr-admin-main">

        {/* PAGE HEADING */}
        <div className="fr-admin-heading">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage and monitor your Food Recipe website</p>
          </div>

          <div className="fr-admin-status">
            <span>●</span> Admin Panel
          </div>
        </div>

        {/* STATISTICS */}
        <div className="fr-admin-stats">

          <div className="fr-admin-stat">
            <div className="fr-admin-stat-icon">👥</div>
            <div>
              <small>Total Users</small>
              <strong>{registeredUsers.length}</strong>
            </div>
          </div>

          <div className="fr-admin-stat">
            <div className="fr-admin-stat-icon">🍲</div>
            <div>
              <small>Shared Recipes</small>
              <strong>{sharedRecipes.length}</strong>
            </div>
          </div>

          <div className="fr-admin-stat">
            <div className="fr-admin-stat-icon">⭐</div>
            <div>
              <small>Total Reviews</small>
              <strong>{reviews.length}</strong>
            </div>
          </div>

          <div className="fr-admin-stat">
            <div className="fr-admin-stat-icon">💗</div>
            <div>
              <small>Total Favorites</small>
              <strong>{favorites.length}</strong>
            </div>
          </div>

          <div className="fr-admin-stat">
            <div className="fr-admin-stat-icon">🛒</div>
            <div>
              <small>Shopping Items</small>
              <strong>{shoppingItems.length}</strong>
            </div>
          </div>

          <div className="fr-admin-stat">
            <div className="fr-admin-stat-icon">📊</div>
            <div>
              <small>Total Activities</small>
              <strong>{activities.length || 1}</strong>
            </div>
          </div>

        </div>

        {/* NAVIGATION TABS */}
        <div className="fr-admin-tabs">
          {[
            ["overview", "📊 Overview"],
            ["recipes", "🍽️ Manage Recipes"],
            ["users", "👥 Users"],
            ["reviews", "⭐ Reviews"],
            ["activity", "📌 Activity"]
          ].map(([tab, label]) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <>
            <div className="fr-admin-grid">

              <section className="fr-admin-card">
                <h3>👥 Registered Users</h3>
                <p className="fr-admin-card-subtitle">
                  Users registered on the website
                </p>

                {registeredUsers.length === 0 ? (
                  <div className="fr-admin-empty">
                    No registered users found
                  </div>
                ) : (
                  <div className="fr-admin-table-wrap">
                    <table className="fr-admin-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Username</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registeredUsers.map((user, index) => (
                          <tr key={user.id || user.email || index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>
                                {user.name ||
                                  user.username ||
                                  user.email}
                              </strong>
                            </td>
                            <td>
                              <span className="fr-admin-pill">
                                {user.role || "user"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="fr-admin-card">
                <h3>🍲 Shared Recipes</h3>
                <p className="fr-admin-card-subtitle">
                  Recipes submitted by users
                </p>

                {sharedRecipes.length === 0 ? (
                  <div className="fr-admin-empty">
                    <span>🍲</span>
                    No shared recipes found
                  </div>
                ) : (
                  <div className="fr-admin-table-wrap">
                    <table className="fr-admin-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Recipe</th>
                          <th>Category</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sharedRecipes.map((recipe, index) => (
                          <tr key={recipe.id}>
                            <td>{index + 1}</td>
                            <td>{recipe.name}</td>
                            <td>{recipe.category}</td>
                            <td>⭐ {recipe.rating || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="fr-admin-card">
                <h3>⭐ Recent Reviews</h3>
                <p className="fr-admin-card-subtitle">
                  Feedback from your community
                </p>

                {reviews.length === 0 ? (
                  <div className="fr-admin-empty">
                    <span>⭐</span>
                    No reviews found
                  </div>
                ) : (
                  reviews.slice(0, 5).map((review, index) => (
                    <div
                      className="fr-admin-review"
                      key={review.id || index}
                    >
                      <strong>
                        {review.userName || review.name || "User"}
                      </strong>
                      <p>{review.comment || "No comment provided"}</p>
                      <small>
                        {"⭐".repeat(
                          Math.min(5, Number(review.rating) || 0)
                        )}
                      </small>
                    </div>
                  ))
                )}
              </section>

              <section className="fr-admin-card">
                <h3>📌 Recent Activity</h3>
                <p className="fr-admin-card-subtitle">
                  Latest website activity
                </p>

                {activities.length === 0 ? (
                  <div className="fr-admin-activity">
                    📌 Activity<br />
                    👤 {username}
                  </div>
                ) : (
                  activities.slice(0, 5).map((activity, index) => (
                    <div
                      className="fr-admin-activity"
                      key={index}
                    >
                      📌 {activity.message || activity.action || "Website activity"}
                    </div>
                  ))
                )}
              </section>

            </div>

            {/* WEBSITE DATA */}
            <section className="fr-admin-card">
              <h3>🗂️ Website Data</h3>
              <p className="fr-admin-card-subtitle">
                Overview of data stored by the website
              </p>

              <div className="fr-admin-data-grid">
                <div className="fr-admin-data-item">
                  <span>👤</span>
                  <div>
                    <small>Logged-in User</small>
                    <strong>{username}</strong>
                  </div>
                </div>

                <div className="fr-admin-data-item">
                  <span>💗</span>
                  <div>
                    <small>Favorites</small>
                    <strong>{favorites.length}</strong>
                  </div>
                </div>

                <div className="fr-admin-data-item">
                  <span>🛒</span>
                  <div>
                    <small>Shopping List</small>
                    <strong>{shoppingItems.length} items</strong>
                  </div>
                </div>

                <div className="fr-admin-data-item">
                  <span>🔐</span>
                  <div>
                    <small>Admin Access</small>
                    <strong>Active</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className="fr-admin-card">
              <h3>⚡ Quick Actions</h3>
              <p className="fr-admin-card-subtitle">
                Common administrator actions
              </p>

              <div className="fr-admin-actions">
                <button onClick={refreshDashboard}>
                  🔄 Refresh Dashboard
                </button>

                <button onClick={openWebsite}>
                  🌐 Open Website
                </button>

                <button onClick={exportData}>
                  📥 Export Data
                </button>
              </div>
            </section>
          </>
        )}

        {/* RECIPE MANAGEMENT */}
        {activeTab === "recipes" && (
          <>
            <section className="fr-admin-card">
              <h3>{editingId !== null ? "✏️ Edit Recipe" : "🍽️ Add New Recipe"}</h3>
              <p className="fr-admin-card-subtitle">
                Add or update recipes on your website
              </p>

              <form className="fr-admin-form" onSubmit={handleSubmit}>
                <div className="fr-admin-form-grid">

                  <label>
                    Recipe Name *
                    <input
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder="Enter recipe name"
                      required
                    />
                  </label>

                  <label>
                    Category *
                    <select
                      name="category"
                      value={form.category}
                      onChange={updateField}
                    >
                      <option>Indian</option>
                      <option>Chinese</option>
                      <option>Desserts</option>
                      <option>Healthy</option>
                      <option>Fast Food</option>
                      <option>Italian</option>
                    </select>
                  </label>

                  <label>
                    Craving
                    <select
                      name="craving"
                      value={form.craving}
                      onChange={updateField}
                    >
                      <option>Spicy</option>
                      <option>Sweet</option>
                      <option>Healthy</option>
                      <option>Comfort Food</option>
                      <option>Quick</option>
                    </select>
                  </label>

                  <label>
                    Preparation Time
                    <input
                      name="time"
                      value={form.time}
                      onChange={updateField}
                      placeholder="Example: 30 min"
                    />
                  </label>

                  <label>
                    Difficulty
                    <select
                      name="difficulty"
                      value={form.difficulty}
                      onChange={updateField}
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </label>

                  <label>
                    Rating
                    <input
                      name="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={form.rating}
                      onChange={updateField}
                    />
                  </label>

                  <label>
                    Image Path or URL
                    <input
                      name="image"
                      value={form.image}
                      onChange={updateField}
                      placeholder="/images/recipe.jpg"
                    />
                  </label>

                </div>

                <label>
                  Description *
                  <textarea
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={updateField}
                    placeholder="Describe the recipe"
                    required
                  />
                </label>

                <label>
                  Ingredients * (one per line)
                  <textarea
                    name="ingredients"
                    rows="5"
                    value={form.ingredients}
                    onChange={updateField}
                    placeholder={"Rice\nOnion\nTomato\nSpices"}
                    required
                  />
                </label>

                <label>
                  Preparation Instructions * (one step per line)
                  <textarea
                    name="instructions"
                    rows="5"
                    value={form.instructions}
                    onChange={updateField}
                    placeholder={"1. Prepare the ingredients.\n2. Cook the recipe.\n3. Serve."}
                    required
                  />
                </label>

                {message && (
                  <div className="fr-admin-message" role="status">
                    {message}
                  </div>
                )}

                <div className="fr-admin-form-buttons">
                  <button
                    type="submit"
                    className="fr-admin-primary"
                  >
                    {editingId !== null ? "Save Changes" : "+ Add Recipe"}
                  </button>

                  {editingId !== null && (
                    <button
                      type="button"
                      className="fr-admin-secondary"
                      onClick={cancelEdit}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className="fr-admin-card">
              <h3>📚 All Recipes ({recipes.length})</h3>
              <p className="fr-admin-card-subtitle">
                Search, edit or delete recipes
              </p>

              <input
                className="fr-admin-search"
                placeholder="Search recipes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {filteredRecipes.length === 0 ? (
                <div className="fr-admin-empty">
                  No recipes found
                </div>
              ) : (
                filteredRecipes.map((recipe) => (
                  <div
                    className="fr-admin-recipe-row"
                    key={recipe.id}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />

                    <div className="fr-admin-recipe-info">
                      <strong>{recipe.name}</strong>
                      <small>
                        {recipe.category} · {recipe.time || "30 min"}
                      </small>
                    </div>

                    <div className="fr-admin-row-buttons">
                      <button
                        className="fr-admin-edit"
                        onClick={() => editRecipe(recipe)}
                      >
                        Edit
                      </button>

                      <button
                        className="fr-admin-delete"
                        onClick={() => deleteRecipe(recipe.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <section className="fr-admin-card">
            <h3>👥 Registered Users</h3>
            <p className="fr-admin-card-subtitle">
              All accounts registered on the website
            </p>

            {registeredUsers.length === 0 ? (
              <div className="fr-admin-empty">
                No registered users found
              </div>
            ) : (
              <div className="fr-admin-table-wrap">
                <table className="fr-admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((user, index) => (
                      <tr key={user.id || user.email || index}>
                        <td>{index + 1}</td>
                        <td>{user.name || user.username || "User"}</td>
                        <td>{user.email || "—"}</td>
                        <td>
                          <span className="fr-admin-pill">
                            {user.role || "user"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <section className="fr-admin-card">
            <h3>⭐ Community Reviews</h3>
            <p className="fr-admin-card-subtitle">
              Reviews submitted by website users
            </p>

            {reviews.length === 0 ? (
              <div className="fr-admin-empty">
                <span>⭐</span>
                No reviews found
              </div>
            ) : (
              reviews.map((review, index) => {
                const recipe = recipes.find(
                  (item) => item.id === review.recipeId
                );

                return (
                  <article
                    className="fr-admin-review"
                    key={review.id || index}
                  >
                    <strong>
                      {review.userName || review.name || "User"}
                    </strong>

                    <p>{review.comment || "No comment provided"}</p>

                    <small>
                      Recipe: {recipe?.name || "Recipe unavailable"}
                      {" · "}
                      Rating: {review.rating || 0}/5
                    </small>
                  </article>
                );
              })
            )}
          </section>
        )}

        {/* ACTIVITY */}
        {activeTab === "activity" && (
          <section className="fr-admin-card">
            <h3>📌 Website Activity</h3>
            <p className="fr-admin-card-subtitle">
              Recent activity information
            </p>

            {activities.length === 0 ? (
              <div className="fr-admin-activity">
                📌 Admin dashboard opened by {username}
              </div>
            ) : (
              activities.map((activity, index) => (
                <div
                  className="fr-admin-activity"
                  key={index}
                >
                  📌 {activity.message || activity.action || "Website activity"}
                </div>
              ))
            )}
          </section>
        )}

        <footer className="fr-admin-footer">
          © 2026 The Food Recipe | Admin Dashboard
        </footer>

      </main>
    </div>
  );
}

export default AdminDashboard;
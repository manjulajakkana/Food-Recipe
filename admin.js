/* =========================================
   THE FOOD RECIPE
   ADMIN DASHBOARD JAVASCRIPT
========================================= */


/* =========================================
   ADMIN ACCESS CHECK
========================================= */

const loggedInUser = localStorage.getItem("loggedInUser");
const loggedInRole = localStorage.getItem("loggedInRole");


if (!loggedInUser || loggedInRole !== "admin") {

    alert("Admin access only.");

    window.location.href = "item.html";

}


/* =========================================
   LOAD ADMIN INFORMATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadAdminInformation();

    loadDashboardStatistics();

    loadUsers();

    loadSharedRecipes();

    loadReviews();

    loadActivity();

    loadWebsiteData();

});


/* =========================================
   ADMIN INFORMATION
========================================= */

function loadAdminInformation() {

    const adminWelcome =
        document.getElementById("adminWelcome");

    const currentAdmin =
        document.getElementById("currentAdmin");


    if (adminWelcome) {

        adminWelcome.textContent =
            "Welcome, " + loggedInUser;

    }


    if (currentAdmin) {

        currentAdmin.textContent =
            loggedInUser;

    }

}


/* =========================================
   GET REGISTERED USERS
========================================= */

function getRegisteredUsers() {

    const data =
        localStorage.getItem("registeredUsers");


    if (!data) {

        return {};

    }


    try {

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Error reading registeredUsers:",
            error
        );

        return {};

    }

}


/* =========================================
   GET USER RECIPES
========================================= */

function getUserRecipes() {

    const data =
        localStorage.getItem("userRecipes");


    if (!data) {

        return [];

    }


    try {

        const recipes = JSON.parse(data);

        return Array.isArray(recipes)
            ? recipes
            : [];

    } catch (error) {

        console.error(
            "Error reading userRecipes:",
            error
        );

        return [];

    }

}


/* =========================================
   GET REVIEWS
========================================= */

function getReviews() {

    const data =
        localStorage.getItem("recipeReviews");


    if (!data) {

        return {};

    }


    try {

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Error reading recipeReviews:",
            error
        );

        return {};

    }

}


/* =========================================
   GET FAVORITES
========================================= */

function getFavorites() {

    const data =
        localStorage.getItem("favorites");


    if (!data) {

        return [];

    }


    try {

        const favorites = JSON.parse(data);

        return Array.isArray(favorites)
            ? favorites
            : [];

    } catch (error) {

        console.error(
            "Error reading favorites:",
            error
        );

        return [];

    }

}


/* =========================================
   GET SHOPPING LIST
========================================= */

function getShoppingList() {

    const data =
        localStorage.getItem("shoppingList");


    if (!data) {

        return [];

    }


    try {

        const list = JSON.parse(data);

        return Array.isArray(list)
            ? list
            : [];

    } catch (error) {

        console.error(
            "Error reading shoppingList:",
            error
        );

        return [];

    }

}


/* =========================================
   GET ACTIVITY LOG
========================================= */

function getActivityLog() {

    const data =
        localStorage.getItem("activityLog");


    if (!data) {

        return [];

    }


    try {

        const activities = JSON.parse(data);

        return Array.isArray(activities)
            ? activities
            : [];

    } catch (error) {

        console.error(
            "Error reading activityLog:",
            error
        );

        return [];

    }

}


/* =========================================
   DASHBOARD STATISTICS
========================================= */

function loadDashboardStatistics() {

    const users =
        getRegisteredUsers();

    const recipes =
        getUserRecipes();

    const reviews =
        getReviews();

    const favorites =
        getFavorites();

    const shoppingList =
        getShoppingList();

    const activities =
        getActivityLog();


    /* ---------- USERS ---------- */

    let totalUsers = 0;

    if (users && typeof users === "object") {

        totalUsers =
            Object.keys(users).length;

    }


    /* ---------- RECIPES ---------- */

    const totalRecipes =
        recipes.length;


    /* ---------- REVIEWS ---------- */

    let totalReviews = 0;


    Object.keys(reviews).forEach(function (recipeId) {

        const recipeReviews =
            reviews[recipeId];


        if (Array.isArray(recipeReviews)) {

            totalReviews +=
                recipeReviews.length;

        }

    });


    /* ---------- FAVORITES ---------- */

    let totalFavorites = 0;


    if (Array.isArray(favorites)) {

        totalFavorites =
            favorites.length;

    } else if (
        favorites &&
        typeof favorites === "object"
    ) {

        totalFavorites =
            Object.keys(favorites).length;

    }


    /* ---------- SHOPPING LIST ---------- */

    let totalShopping = 0;


    if (Array.isArray(shoppingList)) {

        totalShopping =
            shoppingList.length;

    } else if (
        shoppingList &&
        typeof shoppingList === "object"
    ) {

        totalShopping =
            Object.keys(shoppingList).length;

    }


    /* ---------- ACTIVITIES ---------- */

    const totalActivities =
        activities.length;


    /* ---------- DISPLAY ---------- */

    setText(
        "totalUsers",
        totalUsers
    );

    setText(
        "totalRecipes",
        totalRecipes
    );

    setText(
        "totalReviews",
        totalReviews
    );

    setText(
        "totalFavorites",
        totalFavorites
    );

    setText(
        "totalShopping",
        totalShopping
    );

    setText(
        "totalActivities",
        totalActivities
    );

}


/* =========================================
   SAFE TEXT FUNCTION
========================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================
   LOAD USERS
========================================= */

function loadUsers() {

    const users =
        getRegisteredUsers();


    const tableBody =
        document.getElementById(
            "usersTableBody"
        );


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    const usernames =
        Object.keys(users);


    if (usernames.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="3">
                    <div class="empty-state">
                        <span class="empty-state-icon">👥</span>
                        No registered users found
                    </div>
                </td>
            </tr>
        `;

        return;

    }


    usernames.forEach(function (username, index) {

        const userData =
            users[username];


        let role = "User";


        if (
            userData &&
            typeof userData === "object" &&
            userData.role
        ) {

            role =
                userData.role;

        } else if (
            username.toLowerCase().startsWith("admin")
        ) {

            role = "Admin";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                <strong>
                    ${escapeHTML(username)}
                </strong>
            </td>

            <td>

                <span class="role-badge">

                    ${escapeHTML(role)}

                </span>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================
   LOAD SHARED RECIPES
========================================= */

function loadSharedRecipes() {

    const recipes =
        getUserRecipes();


    const tableBody =
        document.getElementById(
            "recipesTableBody"
        );


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    if (recipes.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="empty-state">
                        <span class="empty-state-icon">🍲</span>
                        No shared recipes found
                    </div>
                </td>
            </tr>
        `;

        return;

    }


    recipes.forEach(function (recipe, index) {

        const row =
            document.createElement("tr");


        const name =
            recipe.name ||
            "Unnamed Recipe";


        const category =
            recipe.category ||
            "Unknown";


        const rating =
            recipe.rating ||
            0;


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td class="recipe-name">
                ${escapeHTML(name)}
            </td>

            <td class="recipe-category">
                ${escapeHTML(category)}
            </td>

            <td class="recipe-rating">
                ⭐ ${rating}
            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================
   LOAD REVIEWS
========================================= */

function loadReviews() {

    const reviews =
        getReviews();


    const container =
        document.getElementById(
            "reviewsContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    let foundReview = false;


    Object.keys(reviews).forEach(function (recipeId) {

        const recipeReviews =
            reviews[recipeId];


        if (
            !Array.isArray(recipeReviews)
        ) {

            return;

        }


        recipeReviews.forEach(function (review) {

            foundReview = true;


            const item =
                document.createElement("div");


            item.className =
                "review-item";


            const username =
                review.username ||
                review.user ||
                "Anonymous";


            const rating =
                review.rating ||
                0;


            const text =
                review.text ||
                review.comment ||
                review.review ||
                "No review text";


            const recipeName =
                review.recipeName ||
                review.recipe ||
                "Recipe #" + recipeId;


            item.innerHTML = `

                <div class="review-top">

                    <span class="review-user">

                        👤 ${escapeHTML(username)}

                    </span>

                    <span class="review-rating">

                        ⭐ ${rating}/5

                    </span>

                </div>


                <div class="review-recipe">

                    🍲 ${escapeHTML(recipeName)}

                </div>


                <div class="review-text">

                    ${escapeHTML(text)}

                </div>

            `;


            container.appendChild(item);

        });

    });


    if (!foundReview) {

        container.innerHTML = `

            <div class="empty-state">

                <span class="empty-state-icon">
                    ⭐
                </span>

                No reviews found

            </div>

        `;

    }

}


/* =========================================
   LOAD ACTIVITY
========================================= */

function loadActivity() {

    const activities =
        getActivityLog();


    const container =
        document.getElementById(
            "activityContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (activities.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <span class="empty-state-icon">
                    📊
                </span>

                No activity recorded yet

            </div>

        `;

        return;

    }


    activities.forEach(function (activity) {

        const item =
            document.createElement("div");


        item.className =
            "activity-item";


        const action =
            activity.action ||
            "Activity";


        const details =
            activity.details ||
            "";


        const user =
            activity.user ||
            "Guest";


        const time =
            activity.time ||
            "";


        item.innerHTML = `

            <div class="activity-icon">
                📌
            </div>

            <div class="activity-content">

                <div class="activity-action">

                    ${escapeHTML(action)}

                </div>

                <div class="activity-details">

                    👤 ${escapeHTML(user)}

                    ${details
                        ? " — " + escapeHTML(details)
                        : ""
                    }

                </div>

                <div class="activity-time">

                    ${escapeHTML(time)}

                </div>

            </div>

        `;


        container.appendChild(item);

    });

}


/* =========================================
   WEBSITE DATA
========================================= */

function loadWebsiteData() {

    const favorites =
        getFavorites();


    const shoppingList =
        getShoppingList();


    const favoriteInfo =
        document.getElementById(
            "favoriteInfo"
        );


    const shoppingInfo =
        document.getElementById(
            "shoppingInfo"
        );


    if (favoriteInfo) {

        if (Array.isArray(favorites)) {

            favoriteInfo.textContent =
                favorites.length;

        } else {

            favoriteInfo.textContent =
                Object.keys(favorites).length;

        }

    }


    if (shoppingInfo) {

        if (Array.isArray(shoppingList)) {

            shoppingInfo.textContent =
                shoppingList.length +
                " items";

        } else {

            shoppingInfo.textContent =
                Object.keys(shoppingList).length +
                " items";

        }

    }

}


/* =========================================
   CLEAR ACTIVITY LOG
========================================= */

function clearActivityLog() {

    const confirmClear =
        confirm(
            "Are you sure you want to clear all activity records?"
        );


    if (!confirmClear) {

        return;

    }


    localStorage.removeItem(
        "activityLog"
    );


    loadDashboardStatistics();

    loadActivity();


    alert(
        "Activity log cleared successfully."
    );

}


/* =========================================
   REFRESH DASHBOARD
========================================= */

function refreshDashboard() {

    loadAdminInformation();

    loadDashboardStatistics();

    loadUsers();

    loadSharedRecipes();

    loadReviews();

    loadActivity();

    loadWebsiteData();


    alert(
        "Dashboard refreshed successfully."
    );

}


/* =========================================
   OPEN MAIN WEBSITE
========================================= */

function viewWebsite() {

    window.location.href =
        "item.html";

}


/* =========================================
   EXPORT ADMIN DATA
========================================= */

function exportAdminData() {

    const data = {

        registeredUsers:
            getRegisteredUsers(),

        sharedRecipes:
            getUserRecipes(),

        reviews:
            getReviews(),

        favorites:
            getFavorites(),

        shoppingList:
            getShoppingList(),

        activityLog:
            getActivityLog()

    };


    const json =
        JSON.stringify(
            data,
            null,
            4
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "food-recipe-admin-data.json";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* =========================================
   ADMIN LOGOUT
========================================= */

function adminLogout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    localStorage.removeItem(
        "loggedInRole"
    );


    window.location.href =
        "item.html";

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================
   AUTO REFRESH
========================================= */

setInterval(function () {

    loadDashboardStatistics();

    loadUsers();

    loadSharedRecipes();

    loadReviews();

    loadActivity();

    loadWebsiteData();

}, 5000);


/* =========================================
   END OF ADMIN JAVASCRIPT
========================================= */
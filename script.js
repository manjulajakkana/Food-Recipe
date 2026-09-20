/* =========================================
   THE FOOD RECIPE
   JAVASCRIPT
========================================= */


/* =========================================
   RECIPE DATA
========================================= */

const recipes = [

    /* =========================================
       EXISTING RECIPES
       KEPT AS THEY WERE
    ========================================= */

    {
        id: 1,
        name: "Chicken Biryani",
        category: "indian",
        craving: "spicy",
        image: "images/biryani.jpg",
        rating: 4.9,
        time: "50 min",
        difficulty: "Medium",

        description:
            "Aromatic basmati rice cooked with spicy chicken and fragrant Indian spices.",

        ingredients:
            "Chicken\nBasmati rice\nOnion\nTomato\nYogurt\nGinger garlic paste\nBiryani spices\nMint leaves\nCoriander",

        instructions:
            "1. Marinate the chicken with yogurt and spices.\n\n2. Cook the chicken until tender.\n\n3. Prepare partially cooked basmati rice.\n\n4. Layer rice and chicken.\n\n5. Add mint and coriander.\n\n6. Cover and cook on low heat.\n\n7. Serve hot."
    },


    {
        id: 2,
        name: "Cheesy Pizza",
        category: "fastfood",
        craving: "cheesy",
        image: "images/pizza.jpg",
        rating: 4.8,
        time: "35 min",
        difficulty: "Easy",

        description:
            "Crispy pizza base loaded with melted cheese and delicious toppings.",

        ingredients:
            "Pizza base\nTomato sauce\nMozzarella cheese\nCapsicum\nOnion\nOlives\nOregano",

        instructions:
            "1. Spread tomato sauce over the pizza base.\n\n2. Add mozzarella cheese.\n\n3. Add your favourite toppings.\n\n4. Sprinkle oregano.\n\n5. Bake until the cheese melts.\n\n6. Slice and serve."
    },


    {
        id: 3,
        name: "Creamy Pasta",
        category: "italian",
        craving: "cheesy",
        image: "images/pasta.jpg",
        rating: 4.7,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Creamy and cheesy pasta perfect for a comforting meal.",

        ingredients:
            "Pasta\nButter\nGarlic\nCream\nCheese\nBlack pepper\nOregano",

        instructions:
            "1. Boil the pasta.\n\n2. Melt butter in a pan.\n\n3. Add garlic.\n\n4. Add cream and cheese.\n\n5. Add cooked pasta.\n\n6. Mix well.\n\n7. Season with pepper and oregano."
    },


    {
        id: 4,
        name: "Crispy Burger",
        category: "fastfood",
        craving: "cheesy",
        image: "images/burger.jpg",
        rating: 4.8,
        time: "20 min",
        difficulty: "Easy",

        description:
            "Juicy burger with crispy filling, fresh vegetables and cheese.",

        ingredients:
            "Burger buns\nVeggie or chicken patty\nCheese\nLettuce\nTomato\nOnion\nBurger sauce",

        instructions:
            "1. Toast the burger buns.\n\n2. Cook the patty.\n\n3. Add cheese on top.\n\n4. Place lettuce and tomato.\n\n5. Add the patty.\n\n6. Add sauce.\n\n7. Close the burger and serve."
    },


    {
        id: 5,
        name: "Chocolate Cake",
        category: "dessert",
        craving: "sweet",
        image: "images/cake.jpg",
        rating: 4.9,
        time: "45 min",
        difficulty: "Medium",

        description:
            "Rich, soft and chocolatey cake for every sweet craving.",

        ingredients:
            "Flour\nCocoa powder\nSugar\nMilk\nEggs\nButter\nBaking powder\nChocolate",

        instructions:
            "1. Mix flour and cocoa powder.\n\n2. Add sugar and baking powder.\n\n3. Add eggs, milk and butter.\n\n4. Mix until smooth.\n\n5. Pour into a cake tin.\n\n6. Bake until cooked.\n\n7. Decorate with chocolate."
    },


    {
        id: 6,
        name: "Masala Dosa",
        category: "indian",
        craving: "spicy",
        image: "images/dosa.jpg",
        rating: 4.8,
        time: "30 min",
        difficulty: "Medium",

        description:
            "Crispy South Indian dosa filled with spicy potato masala.",

        ingredients:
            "Dosa batter\nPotatoes\nOnion\nGreen chilli\nMustard seeds\nCurry leaves\nTurmeric",

        instructions:
            "1. Prepare the potato masala.\n\n2. Heat a dosa pan.\n\n3. Spread the dosa batter thinly.\n\n4. Add potato masala.\n\n5. Fold the dosa.\n\n6. Serve with chutney and sambar."
    },


    {
        id: 7,
        name: "Hakka Noodles",
        category: "fastfood",
        craving: "spicy",
        image: "images/noodles.jpg",
        rating: 4.6,
        time: "20 min",
        difficulty: "Easy",

        description:
            "Spicy stir-fried noodles packed with vegetables and flavour.",

        ingredients:
            "Noodles\nCarrot\nCapsicum\nCabbage\nSoy sauce\nChilli sauce\nGarlic",

        instructions:
            "1. Boil the noodles.\n\n2. Heat oil in a wok.\n\n3. Add garlic and vegetables.\n\n4. Stir fry on high heat.\n\n5. Add sauces.\n\n6. Add noodles.\n\n7. Toss everything together."
    },


    {
        id: 8,
        name: "Paneer Masala",
        category: "indian",
        craving: "spicy",
        image: "images/paneer.jpg",
        rating: 4.7,
        time: "30 min",
        difficulty: "Easy",

        description:
            "Soft paneer cooked in a flavourful tomato and spice gravy.",

        ingredients:
            "Paneer\nTomatoes\nOnion\nGinger garlic paste\nSpices\nCream\nCoriander",

        instructions:
            "1. Prepare tomato gravy.\n\n2. Add spices.\n\n3. Add paneer cubes.\n\n4. Cook for a few minutes.\n\n5. Add cream.\n\n6. Garnish with coriander.\n\n7. Serve hot."
    },


    /* =========================================
       NEW RECIPES
    ========================================= */

        {
        id: 9,
        name: "Arancini",
        category: "italian",
        craving: "cheesy",
        image: "images/arancini.jpg",
        rating: 4.6,
        time: "45 min",
        difficulty: "Medium",
        description:
            "Crispy Italian rice balls filled with a savory center and fried until golden.",
        ingredients: ["Cooked rice", "Mozzarella", "Parmesan", "Egg", "Breadcrumbs", "Salt", "Pepper", "Oil"],
        instructions: ["Mix cooked rice with Parmesan and seasoning.", "Shape the rice around mozzarella into balls.", "Dip each ball in beaten egg and coat with breadcrumbs.", "Fry until golden and crispy.", "Drain and serve warm."]
    },
{
        id: 10,
        name: "Brownies",
        category: "dessert",
        craving: "sweet",
        image: "images/brownies.jpg",
        rating: 4.8,
        time: "40 min",
        difficulty: "Easy",

        description:
            "Soft and fudgy chocolate brownies perfect for a sweet craving.",

        ingredients:
            "Flour\nCocoa powder\nSugar\nButter\nEggs\nChocolate chips",

        instructions:
            "1. Melt the butter and chocolate.\n\n2. Mix in sugar and eggs.\n\n3. Add flour and cocoa powder.\n\n4. Mix until smooth.\n\n5. Pour into a baking tray.\n\n6. Bake until set.\n\n7. Cool and cut into squares."
    },


    {
        id: 11,
        name: "Burrito",
        category: "fastfood",
        craving: "cheesy",
        image: "images/buritto.jpg",
        rating: 4.7,
        time: "25 min",
        difficulty: "Easy",

        description:
            "A delicious tortilla filled with rice, beans, vegetables and cheese.",

        ingredients:
            "Tortilla\nRice\nBeans\nCheese\nLettuce\nTomato\nSalsa",

        instructions:
            "1. Warm the tortilla.\n\n2. Add cooked rice and beans.\n\n3. Add cheese and vegetables.\n\n4. Spoon over salsa.\n\n5. Fold the sides and roll tightly.\n\n6. Serve warm."
    },


    {
        id: 12,
        name: "Cheesecake",
        category: "dessert",
        craving: "sweet",
        image: "images/cheesecake.jpg",
        rating: 4.9,
        time: "60 min",
        difficulty: "Medium",

        description:
            "Creamy cheesecake with a buttery biscuit base.",

        ingredients:
            "Cream cheese\nBiscuits\nButter\nSugar\nEggs\nVanilla",

        instructions:
            "1. Crush biscuits and mix with melted butter.\n\n2. Press the mixture into a cake tin.\n\n3. Beat cream cheese, sugar, eggs and vanilla.\n\n4. Pour over the base.\n\n5. Bake until set.\n\n6. Chill before serving."
    },


    {
        id: 13,
        name: "Chicken 65",
        category: "indian",
        craving: "spicy",
        image: "images/chicken 65.jpg",
        rating: 4.8,
        time: "35 min",
        difficulty: "Medium",

        description:
            "Crispy and spicy Indian chicken appetizer packed with flavour.",

        ingredients:
            "Chicken\nCorn flour\nRice flour\nYogurt\nRed chilli powder\nGinger garlic paste\nCurry leaves",

        instructions:
            "1. Marinate chicken with yogurt and spices.\n\n2. Add corn flour and rice flour.\n\n3. Coat the chicken evenly.\n\n4. Fry until crisp and cooked.\n\n5. Temper curry leaves and chillies.\n\n6. Toss the chicken and serve."
    },


    {
        id: 14,
        name: "Chicken Manchuria",
        category: "indian",
        craving: "spicy",
        image: "images/chicken manchuria.jpeg",
        rating: 4.7,
        time: "35 min",
        difficulty: "Medium",

        description:
            "Crispy chicken tossed in a spicy Manchurian-style sauce.",

        ingredients:
            "Chicken\nCorn flour\nCapsicum\nOnion\nGarlic\nSoy sauce\nChilli sauce",

        instructions:
            "1. Coat chicken pieces with flour and spices.\n\n2. Cook until crisp.\n\n3. Stir-fry onion, capsicum and garlic.\n\n4. Add soy sauce and chilli sauce.\n\n5. Add the chicken and toss well.\n\n6. Serve hot."
    },


    {
        id: 15,
        name: "Chicken Nuggets",
        category: "fastfood",
        craving: "cheesy",
        image: "images/chicken nuggets.jpg",
        rating: 4.6,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Crispy golden chicken nuggets that make a perfect quick snack.",

        ingredients:
            "Chicken\nBread crumbs\nFlour\nEgg\nPepper\nSalt",

        instructions:
            "1. Cut chicken into small pieces.\n\n2. Season with salt and pepper.\n\n3. Coat with flour, egg and bread crumbs.\n\n4. Cook until golden and fully cooked.\n\n5. Drain and serve with your favourite dip."
    },


        {
        id: 16,
        name: "Caprese Salad",
        category: "italian",
        craving: "fresh",
        image: "images/caprese salad.jpg",
        rating: 4.6,
        time: "10 min",
        difficulty: "Easy",
        description:
            "A simple Italian salad made with tomatoes, mozzarella and fresh basil.",
        ingredients: ["Tomatoes", "Fresh mozzarella", "Fresh basil", "Olive oil", "Salt", "Black pepper"],
        instructions: ["Slice the tomatoes and mozzarella.", "Arrange tomato and mozzarella slices with basil.", "Drizzle with olive oil.", "Season with salt and pepper.", "Serve fresh."]
    },
{
        id: 17,
        name: "Churros",
        category: "dessert",
        craving: "sweet",
        image: "images/churros.jpg",
        rating: 4.8,
        time: "30 min",
        difficulty: "Medium",

        description:
            "Crispy golden churros coated with sweet cinnamon sugar.",

        ingredients:
            "Flour\nWater\nButter\nSugar\nCinnamon\nOil",

        instructions:
            "1. Boil water, butter and sugar.\n\n2. Add flour and mix into a dough.\n\n3. Pipe the dough into strips.\n\n4. Cook until golden.\n\n5. Coat with cinnamon sugar.\n\n6. Serve warm."
    },


    {
        id: 18,
        name: "Chicken Fried Rice",
        category: "fastfood",
        craving: "spicy",
        image: "images/cr.jpg",
        rating: 4.7,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Flavourful fried rice prepared with chicken, vegetables and sauces.",

        ingredients:
            "Cooked rice\nChicken\nEgg\nCarrot\nSpring onion\nSoy sauce\nGarlic",

        instructions:
            "1. Cook the chicken pieces.\n\n2. Scramble the egg in the same pan.\n\n3. Add garlic and vegetables.\n\n4. Add cooked rice.\n\n5. Add soy sauce and toss well.\n\n6. Garnish with spring onion and serve."
    },


    {
        id: 19,
        name: "Cupcakes",
        category: "dessert",
        craving: "sweet",
        image: "images/cupcakes.jpg",
        rating: 4.8,
        time: "35 min",
        difficulty: "Easy",

        description:
            "Soft and fluffy cupcakes that can be decorated with delicious toppings.",

        ingredients:
            "Flour\nSugar\nEggs\nButter\nMilk\nBaking powder\nVanilla",

        instructions:
            "1. Mix flour and baking powder.\n\n2. Beat butter, sugar and eggs.\n\n3. Add milk and vanilla.\n\n4. Combine with the dry ingredients.\n\n5. Fill cupcake moulds.\n\n6. Bake until fluffy.\n\n7. Decorate and serve."
    },


    {
        id: 20,
        name: "Curd Rice",
        category: "indian",
        craving: "healthy",
        image: "images/curd rice.jpg",
        rating: 4.7,
        time: "15 min",
        difficulty: "Easy",

        description:
            "Cool and creamy South Indian curd rice with a simple tempering.",

        ingredients:
            "Cooked rice\nCurd\nMilk\nSalt\nMustard seeds\nCurry leaves\nGreen chilli",

        instructions:
            "1. Mash the cooked rice lightly.\n\n2. Mix in curd and a little milk.\n\n3. Add salt.\n\n4. Temper mustard seeds, curry leaves and chilli.\n\n5. Mix the tempering into the rice.\n\n6. Serve chilled or at room temperature."
    },


    {
        id: 21,
        name: "Dan Dan Noodles",
        category: "fastfood",
        craving: "spicy",
        image: "images/dan dan noodles.jpg",
        rating: 4.7,
        time: "25 min",
        difficulty: "Medium",

        description:
            "Spicy noodles coated in a rich sesame and chilli sauce.",

        ingredients:
            "Noodles\nSesame paste\nSoy sauce\nChilli oil\nGarlic\nSpring onion\nPeanuts",

        instructions:
            "1. Cook the noodles and drain.\n\n2. Mix sesame paste, soy sauce and chilli oil.\n\n3. Add garlic and combine the sauce.\n\n4. Toss the noodles with the sauce.\n\n5. Garnish with spring onion and peanuts.\n\n6. Serve immediately."
    },


    {
        id: 22,
        name: "Donuts",
        category: "dessert",
        craving: "sweet",
        image: "images/donuts.jpg",
        rating: 4.7,
        time: "45 min",
        difficulty: "Medium",

        description:
            "Soft and delicious donuts finished with a sweet glaze.",

        ingredients:
            "Flour\nSugar\nMilk\nYeast\nButter\nOil\nChocolate glaze",

        instructions:
            "1. Mix flour, yeast, sugar, milk and butter.\n\n2. Knead into a soft dough.\n\n3. Let the dough rise.\n\n4. Cut into donut shapes.\n\n5. Cook until golden.\n\n6. Glaze with chocolate or sugar."
    },


    {
        id: 23,
        name: "Fish Curry",
        category: "indian",
        craving: "spicy",
        image: "images/fish curry.jpg",
        rating: 4.8,
        time: "35 min",
        difficulty: "Medium",

        description:
            "Traditional fish curry cooked in a spicy and tangy gravy.",

        ingredients:
            "Fish\nOnion\nTomato\nTamarind\nRed chilli powder\nTurmeric\nCurry leaves",

        instructions:
            "1. Season the fish with salt and turmeric.\n\n2. Prepare onion and tomato gravy.\n\n3. Add chilli powder and tamarind.\n\n4. Add water and simmer.\n\n5. Gently add the fish pieces.\n\n6. Cook until the fish is done.\n\n7. Garnish with curry leaves."
    },


    {
        id: 24,
        name: "French Fries",
        category: "fastfood",
        craving: "savory",
        image: "images/french fries.jpg",
        rating: 4.7,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Golden crispy potato fries seasoned with simple spices.",

        ingredients:
            "Potatoes\nSalt\nOil\nPepper\nChilli powder",

        instructions:
            "1. Cut potatoes into thin strips.\n\n2. Soak them in water and dry well.\n\n3. Cook until crisp and golden.\n\n4. Drain excess oil.\n\n5. Season with salt and pepper.\n\n6. Serve hot."
    },


    {
        id: 25,
        name: "Garlic Prawns",
        category: "fastfood",
        craving: "spicy",
        image: "images/garlic prawns.jpg",
        rating: 4.8,
        time: "20 min",
        difficulty: "Easy",

        description:
            "Juicy prawns cooked with garlic, butter and a touch of lemon.",

        ingredients:
            "Prawns\nGarlic\nButter\nPepper\nLemon juice\nParsley",

        instructions:
            "1. Clean and season the prawns.\n\n2. Melt butter in a pan.\n\n3. Add garlic and cook briefly.\n\n4. Add prawns and cook until done.\n\n5. Add lemon juice and pepper.\n\n6. Garnish and serve."
    },


    {
        id: 26,
        name: "Gnocchi",
        category: "italian",
        craving: "cheesy",
        image: "images/gnochhi.jpg",
        rating: 4.8,
        time: "35 min",
        difficulty: "Medium",

        description:
            "Soft Italian potato dumplings served with a delicious tomato sauce.",

        ingredients:
            "Potatoes\nFlour\nEgg\nSalt\nTomato sauce\nParmesan cheese",

        instructions:
            "1. Boil and mash the potatoes.\n\n2. Mix with flour, egg and salt.\n\n3. Shape into small gnocchi pieces.\n\n4. Cook in boiling water until they float.\n\n5. Toss with tomato sauce.\n\n6. Add Parmesan and serve."
    },


    {
        id: 27,
        name: "Grilled Fish",
        category: "healthy",
        craving: "healthy",
        image: "images/grilled fish.jpg",
        rating: 4.8,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Light and flavourful grilled fish prepared with lemon and herbs.",

        ingredients:
            "Fish fillet\nLemon juice\nGarlic\nPepper\nSalt\nOlive oil",

        instructions:
            "1. Marinate the fish with lemon, garlic, pepper and salt.\n\n2. Brush lightly with oil.\n\n3. Heat a grill pan.\n\n4. Grill both sides until cooked.\n\n5. Serve with vegetables or salad."
    },


    {
        id: 28,
        name: "Ice Creams",
        category: "dessert",
        craving: "sweet",
        image: "images/icecreams.jpg",
        rating: 4.8,
        time: "30 min",
        difficulty: "Easy",

        description:
            "Creamy homemade ice cream perfect for a refreshing dessert.",

        ingredients:
            "Milk\nCream\nSugar\nVanilla\nChocolate or fruit",

        instructions:
            "1. Mix milk, cream, sugar and vanilla.\n\n2. Add your preferred flavour.\n\n3. Chill the mixture.\n\n4. Freeze until firm.\n\n5. Scoop and serve."
    },


    {
        id: 29,
        name: "Idli",
        category: "indian",
        craving: "healthy",
        image: "images/idli.jpg",
        rating: 4.8,
        time: "30 min",
        difficulty: "Medium",

        description:
            "Soft and fluffy South Indian idlis served with chutney and sambar.",

        ingredients:
            "Idli batter\nWater\nSalt",

        instructions:
            "1. Prepare fermented idli batter.\n\n2. Add salt and mix.\n\n3. Grease the idli moulds.\n\n4. Pour in the batter.\n\n5. Steam until soft and cooked.\n\n6. Serve with chutney and sambar."
    },


    {
        id: 30,
        name: "Kung Pao Chicken",
        category: "fastfood",
        craving: "spicy",
        image: "images/kung pao chicken.jpg",
        rating: 4.7,
        time: "30 min",
        difficulty: "Medium",

        description:
            "Spicy chicken stir-fry with vegetables, chilli and crunchy peanuts.",

        ingredients:
            "Chicken\nPeanuts\nCapsicum\nGarlic\nSoy sauce\nVinegar\nChilli",

        instructions:
            "1. Cut and season the chicken.\n\n2. Cook the chicken until browned.\n\n3. Stir-fry garlic, chilli and capsicum.\n\n4. Add soy sauce and vinegar.\n\n5. Return the chicken to the pan.\n\n6. Add peanuts and toss well."
    },


    {
        id: 31,
        name: "Lemon Rice",
        category: "indian",
        craving: "spicy",
        image: "images/lemon rice.jpg",
        rating: 4.7,
        time: "20 min",
        difficulty: "Easy",

        description:
            "Tangy South Indian lemon rice with peanuts and aromatic tempering.",

        ingredients:
            "Cooked rice\nLemon juice\nPeanuts\nMustard seeds\nCurry leaves\nGreen chilli\nTurmeric",

        instructions:
            "1. Heat oil and temper mustard seeds.\n\n2. Add peanuts, curry leaves and chilli.\n\n3. Add turmeric.\n\n4. Mix in cooked rice.\n\n5. Turn off the heat and add lemon juice.\n\n6. Mix and serve."
    },


        {
        id: 32,
        name: "Cannoli",
        category: "dessert",
        craving: "sweet",
        image: "images/cannoli.jpg",
        rating: 4.7,
        time: "40 min",
        difficulty: "Medium",
        description:
            "A classic Italian dessert with crisp pastry shells and a creamy sweet filling.",
        ingredients: ["Cannoli shells", "Ricotta cheese", "Powdered sugar", "Vanilla", "Chocolate chips"],
        instructions: ["Mix ricotta with powdered sugar and vanilla.", "Chill the filling.", "Fill the cannoli shells just before serving.", "Garnish with chocolate chips.", "Serve immediately."]
    },
{
        id: 33,
        name: "Margherita Pizza",
        category: "italian",
        craving: "cheesy",
        image: "images/margherita pizza.jpg",
        rating: 4.8,
        time: "30 min",
        difficulty: "Easy",

        description:
            "Classic Italian pizza topped with tomato, mozzarella and fresh basil.",

        ingredients:
            "Pizza dough\nTomato sauce\nMozzarella\nFresh basil\nOlive oil",

        instructions:
            "1. Roll out the pizza dough.\n\n2. Spread tomato sauce.\n\n3. Add mozzarella and basil.\n\n4. Drizzle with olive oil.\n\n5. Bake until the crust is golden.\n\n6. Slice and serve."
    },


    {
        id: 34,
        name: "Mixed Vegetable Curry",
        category: "indian",
        craving: "spicy",
        image: "images/mixed vegetable curry.jpg",
        rating: 4.7,
        time: "30 min",
        difficulty: "Easy",

        description:
            "Colourful mixed vegetables cooked in a flavourful Indian gravy.",

        ingredients:
            "Mixed vegetables\nOnion\nTomato\nGinger garlic paste\nSpices\nCoriander",

        instructions:
            "1. Chop the vegetables.\n\n2. Cook onion and ginger garlic paste.\n\n3. Add tomato and spices.\n\n4. Add the vegetables and water.\n\n5. Cover and cook until tender.\n\n6. Garnish with coriander."
    },


    {
        id: 35,
        name: "Moong Dal Chilla",
        category: "indian",
        craving: "healthy",
        image: "images/moong dal chilla.jpg",
        rating: 4.8,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Healthy and protein-rich moong dal pancakes with fresh vegetables.",

        ingredients:
            "Moong dal\nGreen chilli\nGinger\nOnion\nCoriander\nSalt",

        instructions:
            "1. Soak moong dal and blend into a batter.\n\n2. Add chilli, ginger, onion and coriander.\n\n3. Heat a pan.\n\n4. Spread the batter into a thin circle.\n\n5. Cook both sides until golden.\n\n6. Serve with chutney."
    },


    {
        id: 36,
        name: "Mutton Biryani",
        category: "indian",
        craving: "spicy",
        image: "images/mutton biryani.jpg",
        rating: 4.9,
        time: "70 min",
        difficulty: "Hard",

        description:
            "Rich and aromatic biryani made with tender mutton and fragrant rice.",

        ingredients:
            "Mutton\nBasmati rice\nOnion\nYogurt\nGinger garlic paste\nBiryani spices\nMint\nCoriander",

        instructions:
            "1. Marinate the mutton with yogurt and spices.\n\n2. Cook until tender.\n\n3. Prepare partially cooked rice.\n\n4. Layer rice and mutton.\n\n5. Add mint and coriander.\n\n6. Cover and cook on low heat.\n\n7. Serve hot."
    },


    {
        id: 37,
        name: "Oatmeal",
        category: "healthy",
        craving: "healthy",
        image: "images/oatmeal.jpg",
        rating: 4.6,
        time: "10 min",
        difficulty: "Easy",

        description:
            "Warm and nutritious oatmeal topped with fruit and nuts.",

        ingredients:
            "Oats\nMilk\nBanana\nHoney\nNuts\nCinnamon",

        instructions:
            "1. Add oats and milk to a pan.\n\n2. Cook until creamy.\n\n3. Add cinnamon and honey.\n\n4. Top with banana and nuts.\n\n5. Serve warm."
    },


    {
        id: 38,
        name: "Onion Rings",
        category: "fastfood",
        craving: "savory",
        image: "images/onion rings.jpg",
        rating: 4.6,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Crunchy golden onion rings served with a delicious dipping sauce.",

        ingredients:
            "Onion\nFlour\nCorn flour\nMilk\nBread crumbs\nSalt\nPepper",

        instructions:
            "1. Slice onions into rings.\n\n2. Prepare a flour and milk coating.\n\n3. Dip the onion rings.\n\n4. Coat with bread crumbs.\n\n5. Cook until crisp and golden.\n\n6. Serve with a dip."
    },


    {
        id: 39,
        name: "Pancake",
        category: "dessert",
        craving: "sweet",
        image: "images/pancake.jpg",
        rating: 4.7,
        time: "20 min",
        difficulty: "Easy",

        description:
            "Soft fluffy pancakes that are perfect with fruit or syrup.",

        ingredients:
            "Flour\nMilk\nEgg\nSugar\nBaking powder\nButter",

        instructions:
            "1. Mix flour, sugar and baking powder.\n\n2. Add milk and egg.\n\n3. Mix into a smooth batter.\n\n4. Pour onto a hot pan.\n\n5. Cook both sides until golden.\n\n6. Serve with fruit or syrup."
    },


    {
        id: 40,
        name: "Panna Cotta",
        category: "dessert",
        craving: "sweet",
        image: "images/panna cotta.jpg",
        rating: 4.8,
        time: "25 min",
        difficulty: "Medium",

        description:
            "Smooth and creamy Italian dessert with a delicate vanilla flavour.",

        ingredients:
            "Cream\nMilk\nSugar\nVanilla\nGelatin",

        instructions:
            "1. Heat cream, milk and sugar.\n\n2. Add vanilla.\n\n3. Add softened gelatin.\n\n4. Mix until dissolved.\n\n5. Pour into moulds.\n\n6. Refrigerate until set."
    },


    {
        id: 41,
        name: "Dal Palak",
        category: "indian",
        craving: "healthy",
        image: "images/pdal palak.jpg",
        rating: 4.7,
        time: "30 min",
        difficulty: "Easy",

        description:
            "Nutritious dal cooked with fresh spinach and aromatic spices.",

        ingredients:
            "Dal\nSpinach\nOnion\nTomato\nGarlic\nTurmeric\nCumin",

        instructions:
            "1. Cook dal until soft.\n\n2. Cook onion, garlic and tomato.\n\n3. Add spinach and cook until wilted.\n\n4. Add the cooked dal and turmeric.\n\n5. Temper cumin and garlic.\n\n6. Mix and serve."
    },


    {
        id: 42,
        name: "Peanut Butter",
        category: "healthy",
        craving: "healthy",
        image: "images/peanut butter.jpg",
        rating: 4.6,
        time: "15 min",
        difficulty: "Easy",

        description:
            "Simple homemade peanut butter made from roasted peanuts.",

        ingredients:
            "Roasted peanuts\nSalt\nHoney",

        instructions:
            "1. Roast the peanuts if needed.\n\n2. Remove the skins.\n\n3. Blend until smooth and creamy.\n\n4. Add salt and honey if desired.\n\n5. Store in a clean container."
    },


    {
        id: 43,
        name: "Pizza Quattro Formaggi",
        category: "italian",
        craving: "cheesy",
        image: "images/pizza quattro formaggi.jpg",
        rating: 4.9,
        time: "35 min",
        difficulty: "Medium",

        description:
            "Classic Italian four-cheese pizza with a rich and creamy flavour.",

        ingredients:
            "Pizza dough\nMozzarella\nParmesan\nGorgonzola\nRicotta\nOregano",

        instructions:
            "1. Roll out the pizza dough.\n\n2. Add the four cheeses evenly.\n\n3. Sprinkle oregano.\n\n4. Bake until the crust is golden and cheese melts.\n\n5. Slice and serve."
    },


    {
        id: 44,
        name: "Ravioli",
        category: "italian",
        craving: "cheesy",
        image: "images/ravioli.jpg",
        rating: 4.8,
        time: "40 min",
        difficulty: "Medium",

        description:
            "Italian stuffed pasta filled with creamy cheese and spinach.",

        ingredients:
            "Ravioli pasta\nRicotta\nSpinach\nTomato sauce\nParmesan\nBlack pepper",

        instructions:
            "1. Prepare the filling with ricotta and spinach.\n\n2. Fill the ravioli sheets.\n\n3. Seal the edges.\n\n4. Cook in boiling water.\n\n5. Toss with tomato sauce.\n\n6. Add Parmesan and serve."
    },


    {
        id: 45,
        name: "Risotto",
        category: "italian",
        craving: "cheesy",
        image: "images/risotto.jpg",
        rating: 4.8,
        time: "35 min",
        difficulty: "Medium",

        description:
            "Creamy Italian rice dish prepared slowly with stock and Parmesan.",

        ingredients:
            "Arborio rice\nVegetable stock\nOnion\nButter\nParmesan\nBlack pepper",

        instructions:
            "1. Cook onion in butter.\n\n2. Add Arborio rice.\n\n3. Add warm stock gradually.\n\n4. Stir until the rice becomes creamy.\n\n5. Add Parmesan and pepper.\n\n6. Serve immediately."
    },


    {
        id: 46,
        name: "Saltimbocca",
        category: "italian",
        craving: "savory",
        image: "images/saltimbocca.jpg",
        rating: 4.7,
        time: "30 min",
        difficulty: "Medium",

        description:
            "Classic Italian dish prepared with tender meat, sage and rich pan juices.",

        ingredients:
            "Chicken or veal\nProsciutto\nSage\nButter\nOlive oil\nBlack pepper",

        instructions:
            "1. Place sage and prosciutto over the meat.\n\n2. Secure if needed.\n\n3. Heat oil and butter.\n\n4. Cook until browned and done.\n\n5. Spoon the pan juices over the meat.\n\n6. Serve warm."
    },


    {
        id: 47,
        name: "Sandwich",
        category: "fastfood",
        craving: "cheesy",
        image: "images/sandwich.jpg",
        rating: 4.6,
        time: "15 min",
        difficulty: "Easy",

        description:
            "Fresh and simple sandwich filled with vegetables and cheese.",

        ingredients:
            "Bread\nLettuce\nTomato\nCheese\nCucumber\nMayonnaise",

        instructions:
            "1. Toast the bread lightly.\n\n2. Spread mayonnaise.\n\n3. Add vegetables and cheese.\n\n4. Season lightly.\n\n5. Place the second bread slice on top.\n\n6. Cut and serve."
    },


    {
        id: 48,
        name: "Shortcake",
        category: "dessert",
        craving: "sweet",
        image: "images/shortcake.jpg",
        rating: 4.7,
        time: "40 min",
        difficulty: "Medium",

        description:
            "Soft buttery shortcake served with strawberries and cream.",

        ingredients:
            "Flour\nSugar\nButter\nMilk\nStrawberries\nWhipped cream",

        instructions:
            "1. Mix flour, sugar, butter and milk.\n\n2. Form the shortcake dough.\n\n3. Bake until lightly golden.\n\n4. Cool and slice.\n\n5. Add strawberries and whipped cream.\n\n6. Serve."
    },


        {
        id: 49,
        name: "Italian Panini",
        category: "italian",
        craving: "savory",
        image: "images/italian panini.jpg",
        rating: 4.6,
        time: "15 min",
        difficulty: "Easy",
        description:
            "A warm Italian-style pressed sandwich filled with cheese and fresh ingredients.",
        ingredients: ["Panini bread", "Mozzarella", "Tomato", "Basil", "Olive oil", "Salt", "Pepper"],
        instructions: ["Slice the panini bread.", "Add mozzarella, tomato and basil.", "Season lightly.", "Brush the outside with olive oil.", "Toast or press until warm and golden."]
    },
{
        id: 50,
        name: "Lasagna",
        category: "italian",
        craving: "cheesy",
        image: "images/lasagna.jpg",
        rating: 4.8,
        time: "60 min",
        difficulty: "Medium",
        description:
            "A classic Italian baked pasta dish layered with sauce, pasta and cheese.",
        ingredients: ["Lasagna sheets", "Tomato sauce", "Cheese", "Onion", "Garlic", "Mixed herbs", "Salt", "Pepper"],
        instructions: ["Prepare the sauce with onion, garlic and herbs.", "Layer sauce, lasagna sheets and cheese in a baking dish.", "Repeat the layers.", "Top with cheese.", "Bake until bubbling and golden."]
    },
{
        id: 51,
        name: "Tiramisu",
        category: "dessert",
        craving: "sweet",
        image: "images/tiramisu.jpg",
        rating: 4.9,
        time: "35 min",
        difficulty: "Medium",

        description:
            "Creamy Italian dessert layered with coffee-soaked biscuits and cocoa.",

        ingredients:
            "Ladyfinger biscuits\nCoffee\nMascarpone\nSugar\nCocoa powder\nCream",

        instructions:
            "1. Prepare strong coffee and let it cool.\n\n2. Whip mascarpone, cream and sugar.\n\n3. Dip biscuits briefly in coffee.\n\n4. Layer biscuits and cream.\n\n5. Dust with cocoa powder.\n\n6. Chill before serving."
    },


    {
        id: 52,
        name: "Upma",
        category: "indian",
        craving: "healthy",
        image: "images/upma.jpg",
        rating: 4.7,
        time: "20 min",
        difficulty: "Easy",

        description:
            "Soft and flavourful South Indian upma made with roasted semolina.",

        ingredients:
            "Semolina\nOnion\nGreen chilli\nMustard seeds\nCurry leaves\nWater\nSalt",

        instructions:
            "1. Roast semolina lightly.\n\n2. Temper mustard seeds and curry leaves.\n\n3. Add onion and chilli.\n\n4. Add water and salt.\n\n5. Slowly add semolina while stirring.\n\n6. Cook until soft and fluffy."
    },


    {
        id: 53,
        name: "Vegetable Omelette",
        category: "healthy",
        craving: "healthy",
        image: "images/vegetable omelette.jpg",
        rating: 4.7,
        time: "15 min",
        difficulty: "Easy",

        description:
            "Nutritious omelette packed with fresh vegetables.",

        ingredients:
            "Eggs\nOnion\nTomato\nCapsicum\nSpinach\nSalt\nPepper",

        instructions:
            "1. Beat the eggs.\n\n2. Add chopped vegetables.\n\n3. Season with salt and pepper.\n\n4. Heat a pan and add the mixture.\n\n5. Cook both sides until set.\n\n6. Serve warm."
    },


    {
        id: 54,
        name: "Vegetable Soup",
        category: "healthy",
        craving: "healthy",
        image: "images/vegetable soup.jpg",
        rating: 4.7,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Warm and nutritious vegetable soup filled with fresh vegetables.",

        ingredients:
            "Carrot\nBeans\nCabbage\nPeas\nOnion\nGarlic\nVegetable stock",

        instructions:
            "1. Chop all vegetables.\n\n2. Sauté onion and garlic.\n\n3. Add vegetables and stock.\n\n4. Simmer until the vegetables are tender.\n\n5. Season with salt and pepper.\n\n6. Serve hot."
    },


    {
        id: 55,
        name: "Waffles",
        category: "dessert",
        craving: "sweet",
        image: "images/waffles.jpg",
        rating: 4.8,
        time: "25 min",
        difficulty: "Easy",

        description:
            "Crispy golden waffles that are perfect with fruit or syrup.",

        ingredients:
            "Flour\nMilk\nEggs\nButter\nSugar\nBaking powder",

        instructions:
            "1. Mix flour, sugar and baking powder.\n\n2. Add milk, eggs and melted butter.\n\n3. Mix into a smooth batter.\n\n4. Preheat the waffle maker.\n\n5. Cook until golden and crisp.\n\n6. Serve with fruit or syrup."
    },


    {
        id: 56,
        name: "Cake",
        category: "dessert",
        craving: "sweet",
        image: "images/chocolate cake.jpg",
        rating: 4.8,
        time: "45 min",
        difficulty: "Medium",

        description:
            "Soft homemade cake with a rich and delicious texture.",

        ingredients:
            "Flour\nSugar\nEggs\nMilk\nButter\nBaking powder\nVanilla",

        instructions:
            "1. Mix flour and baking powder.\n\n2. Beat butter and sugar.\n\n3. Add eggs and vanilla.\n\n4. Add milk and mix well.\n\n5. Pour into a cake tin.\n\n6. Bake until fully cooked.\n\n7. Cool and decorate before serving."
    }

];


/* =========================================
   FAVORITES
========================================= */

let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];


/* =========================================
   LOGIN / AUTHENTICATION
   USER + ADMIN ROLES
========================================= */

let registeredUsers =
    JSON.parse(
        localStorage.getItem("registeredUsers")
    ) || {};

let loggedInUser =
    localStorage.getItem("loggedInUser") || null;

let loggedInRole =
    localStorage.getItem("loggedInRole") || null;


/* =========================================
   ACTIVITY LOG
========================================= */

function addActivity(type, message, username = loggedInUser) {

    const activities =
        JSON.parse(
            localStorage.getItem("activityLog")
        ) || [];

    activities.push({

        type: type,

        message: message,

        user: username || "Guest",

        date: new Date().toISOString()

    });

    if (activities.length > 100) {

        activities.splice(
            0,
            activities.length - 100
        );

    }

    localStorage.setItem(
        "activityLog",
        JSON.stringify(activities)
    );

}


/* =========================================
   NORMALIZE OLD USER ACCOUNTS
========================================= */

function getUserRecord(username) {

    const account =
        registeredUsers[username];

    if (!account) {
        return null;
    }

    /*
       Old version stored:
       username: "password"

       New version stores:
       username: {
           password: "...",
           role: "user"
       }
    */

    if (typeof account === "string") {

        return {

            password: account,

            role: "user"

        };

    }

    return {

        password: account.password || "",

        role: account.role || "user"

    };

}


/* =========================================
   CREATE ADMIN ACCOUNT
========================================= */

function ensureAdminAccount() {

    registeredUsers =
        JSON.parse(
            localStorage.getItem("registeredUsers")
        ) || {};

    /*
       Demo admin credentials:

       Username: admin
       Password: admin123
    */

    if (!registeredUsers.admin) {

        registeredUsers.admin = {

            password: "admin123",

            role: "admin"

        };

    } else if (
        typeof registeredUsers.admin === "string"
    ) {

        /*
           If an old account named admin already exists,
           keep its password but convert it to admin role.
        */

        registeredUsers.admin = {

            password:
                registeredUsers.admin,

            role: "admin"

        };

    } else {

        registeredUsers.admin.role = "admin";

    }

    localStorage.setItem(
        "registeredUsers",
        JSON.stringify(
            registeredUsers
        )
    );

}


/* =========================================
   LOGIN REQUIRED
========================================= */

function requireLogin() {

    if (!loggedInUser) {

        alert(
            "Please login first to use this feature."
        );

        openLoginModal();

        return false;

    }

    return true;

}


/* =========================================
   OPEN LOGIN MODAL
========================================= */

function openLoginModal() {

    document
        .getElementById("loginModal")
        .classList.add("show");

    showLoginTab();

}


/* =========================================
   CLOSE LOGIN MODAL
========================================= */

function closeLoginModal() {

    document
        .getElementById("loginModal")
        .classList.remove("show");

}


/* =========================================
   SHOW LOGIN TAB
========================================= */

function showLoginTab() {

    document.getElementById(
        "loginFormBox"
    ).style.display = "block";

    document.getElementById(
        "signupFormBox"
    ).style.display = "none";

    document.getElementById(
        "loginTabBtn"
    ).classList.add("active-tab");

    document.getElementById(
        "signupTabBtn"
    ).classList.remove("active-tab");

}


/* =========================================
   SHOW SIGNUP TAB
========================================= */

function showSignupTab() {

    document.getElementById(
        "loginFormBox"
    ).style.display = "none";

    document.getElementById(
        "signupFormBox"
    ).style.display = "block";

    document.getElementById(
        "signupTabBtn"
    ).classList.add("active-tab");

    document.getElementById(
        "loginTabBtn"
    ).classList.remove("active-tab");

}


/* =========================================
   HANDLE LOGIN
========================================= */

function handleLogin(event) {

    event.preventDefault();

    const username =
        document
            .getElementById(
                "loginUsername"
            )
            .value
            .trim();

    const password =
        document
            .getElementById(
                "loginPassword"
            )
            .value;


    if (!username || !password) {

        alert(
            "Please enter both username and password."
        );

        return;

    }


    const user =
        getUserRecord(username);


    if (
        user &&
        user.password === password
    ) {

        loggedInUser =
            username;

        loggedInRole =
            user.role || "user";


        localStorage.setItem(
            "loggedInUser",
            username
        );

        localStorage.setItem(
            "loggedInRole",
            loggedInRole
        );


        addActivity(
            "login",
            `${username} logged in.`
        );


        /*
           Admin goes directly to dashboard.
        */

        if (
            loggedInRole === "admin"
        ) {

            window.location.href =
                "admin.html";

            return;

        }


        updateAuthUI();

        closeLoginModal();

        document
            .getElementById(
                "loginForm"
            )
            .reset();

    } else {

        alert(
            "Invalid username or password. Please sign up if you don't have an account yet."
        );

    }

}


/* =========================================
   HANDLE SIGNUP
========================================= */

function handleSignup(event) {

    event.preventDefault();

    const username =
        document
            .getElementById(
                "signupUsername"
            )
            .value
            .trim();

    const password =
        document
            .getElementById(
                "signupPassword"
            )
            .value;


    if (!username || !password) {

        alert(
            "Please enter both username and password."
        );

        return;

    }


    if (registeredUsers[username]) {

        alert(
            "This username is already taken. Please choose another one."
        );

        return;

    }


    /*
       ADMIN RULE:
       Both username AND password must start with "admin".
       Example: adminrani / admin123
    */

    const usernameStartsWithAdmin =
        username.toLowerCase().startsWith("admin");

    const passwordStartsWithAdmin =
        password.toLowerCase().startsWith("admin");

    if (usernameStartsWithAdmin !== passwordStartsWithAdmin) {

        alert(
            "For an admin account, BOTH username and password must start with 'admin'."
        );

        return;

    }

    const role =
        usernameStartsWithAdmin && passwordStartsWithAdmin
            ? "admin"
            : "user";

    registeredUsers[username] = {

        password:
            password,

        role:
            role

    };


    localStorage.setItem(
        "registeredUsers",
        JSON.stringify(
            registeredUsers
        )
    );


    loggedInUser =
        username;

    loggedInRole =
        role;


    localStorage.setItem(
        "loggedInUser",
        username
    );

    localStorage.setItem(
        "loggedInRole",
        role
    );


    addActivity(
        "signup",
        `${username} created an account.`
    );


    if (role === "admin") {

        alert(
            "Admin account created successfully. Opening Admin Dashboard..."
        );

        window.location.href = "admin.html";

        return;

    }


    updateAuthUI();

    closeLoginModal();

    document
        .getElementById(
            "signupForm"
        )
        .reset();

}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    const oldUser =
        loggedInUser;


    if (oldUser) {

        addActivity(
            "logout",
            `${oldUser} logged out.`,
            oldUser
        );

    }


    loggedInUser = null;

    loggedInRole = null;


    localStorage.removeItem(
        "loggedInUser"
    );

    localStorage.removeItem(
        "loggedInRole"
    );


    updateAuthUI();

}


/* =========================================
   UPDATE AUTH UI
========================================= */

function updateAuthUI() {

    const loginBtn =
        document.getElementById(
            "loginBtn"
        );

    const userInfo =
        document.getElementById(
            "userInfo"
        );

    const loggedUsername =
        document.getElementById(
            "loggedUsername"
        );


    if (!loginBtn || !userInfo || !loggedUsername) {
        return;
    }


    if (loggedInUser) {

        loginBtn.style.display =
            "none";

        userInfo.style.display =
            "flex";

        loggedUsername.textContent =
            loggedInUser;

    } else {

        loginBtn.style.display =
            "inline-flex";

        userInfo.style.display =
            "none";

    }

}


/* =========================================
   INITIALIZE AUTHENTICATION
========================================= */



/*
   Recover role for an existing login.
*/

if (loggedInUser) {

    const currentUser =
        getUserRecord(
            loggedInUser
        );

    if (currentUser) {

        loggedInRole =
            currentUser.role || "user";

        localStorage.setItem(
            "loggedInRole",
            loggedInRole
        );

    }

}


/* =========================================
   RATINGS AND REVIEWS
========================================= */

let recipeReviews =
    JSON.parse(
        localStorage.getItem("recipeReviews")
    ) || {};


/* =========================================
   GET REVIEWS FOR RECIPE
========================================= */

function getRecipeReviews(id) {

    const key =
        String(id);

    if (
        !Array.isArray(
            recipeReviews[key]
        )
    ) {

        recipeReviews[key] = [];

    }

    return recipeReviews[key];

}


/* =========================================
   CALCULATE RECIPE RATING
========================================= */

function getRecipeRating(recipe) {

    const reviews =
        getRecipeReviews(
            recipe.id
        );

    if (
        reviews.length === 0
    ) {

        return Number(
            recipe.rating || 0
        ).toFixed(1);

    }

    const total =
        Number(
            recipe.rating || 0
        )
        +
        reviews.reduce(
            (sum, review) =>
                sum +
                Number(
                    review.rating
                ),
            0
        );

    return (
        total /
        (
            reviews.length + 1
        )
    ).toFixed(1);

}


/* =========================================
   SAVE REVIEWS
========================================= */

function saveRecipeReviews() {

    localStorage.setItem(
        "recipeReviews",
        JSON.stringify(
            recipeReviews
        )
    );

}


/* =========================================
   ESCAPE REVIEW TEXT
========================================= */

function escapeHtml(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   RENDER RATING AND REVIEWS
========================================= */

function renderRatingReviews(recipe) {

    const reviews =
        getRecipeReviews(
            recipe.id
        );

    const averageRating =
        getRecipeRating(
            recipe
        );

    let reviewList;

    if (
        reviews.length === 0
    ) {

        reviewList = `

            <p class="no-reviews">

                No reviews yet.
                Be the first to review this recipe! ❤️

            </p>

        `;

    } else {

        reviewList =
            reviews
                .map(
                    review => `

                        <div class="review-item">

                            <div class="review-header">

                                <span
                                    class="review-stars">

                                    ${
                                        "⭐".repeat(
                                            Number(
                                                review.rating
                                            )
                                        )
                                    }

                                </span>

                                <span
                                    class="review-date">

                                    ${review.date}

                                </span>

                            </div>

                            <p>

                                ${
                                    escapeHtml(
                                        review.text
                                    )
                                }

                            </p>

                        </div>

                    `
                )
                .join("");

    }


    return `

        <div
            class="rating-review-section">

            <div
                class="rating-summary">

                <div>

                    <span
                        class="big-rating">

                        ⭐ ${averageRating}

                    </span>

                    <span
                        class="review-count">

                        (
                        ${reviews.length}
                        ${
                            reviews.length === 1
                                ? "review"
                                : "reviews"
                        }
                        )

                    </span>

                </div>

            </div>


            <div
                class="review-form">

                <h3>

                    ⭐ Rate this Recipe

                </h3>


                <div
                    class="star-rating"
                    aria-label="Choose a rating from 1 to 5 stars">

                    <input
                        type="radio"
                        id="star5-${recipe.id}"
                        name="rating-${recipe.id}"
                        value="5">

                    <label
                        for="star5-${recipe.id}"
                        title="5 stars">

                        ★

                    </label>


                    <input
                        type="radio"
                        id="star4-${recipe.id}"
                        name="rating-${recipe.id}"
                        value="4">

                    <label
                        for="star4-${recipe.id}"
                        title="4 stars">

                        ★

                    </label>


                    <input
                        type="radio"
                        id="star3-${recipe.id}"
                        name="rating-${recipe.id}"
                        value="3">

                    <label
                        for="star3-${recipe.id}"
                        title="3 stars">

                        ★

                    </label>


                    <input
                        type="radio"
                        id="star2-${recipe.id}"
                        name="rating-${recipe.id}"
                        value="2">

                    <label
                        for="star2-${recipe.id}"
                        title="2 stars">

                        ★

                    </label>


                    <input
                        type="radio"
                        id="star1-${recipe.id}"
                        name="rating-${recipe.id}"
                        value="1">

                    <label
                        for="star1-${recipe.id}"
                        title="1 star">

                        ★

                    </label>

                </div>


                <textarea
                    id="reviewText-${recipe.id}"
                    class="review-textarea"
                    placeholder="Write your review..."
                    maxlength="300"></textarea>


                <button
                    type="button"
                    class="review-submit-btn"
                    onclick="submitReview(${recipe.id})">

                    📝 Submit Review

                </button>

            </div>


            <div
                class="reviews-list">

                <h3>

                    💬 Reviews

                </h3>

                ${reviewList}

            </div>

        </div>

    `;

}


/* =========================================
   SUBMIT REVIEW
========================================= */

function submitReview(id) {

    const selectedRating =
        document.querySelector(
            `input[name="rating-${id}"]:checked`
        );

    const reviewBox =
        document.getElementById(
            `reviewText-${id}`
        );

    if (
        !selectedRating
    ) {

        alert(
            "⭐ Please select a rating from 1 to 5 stars."
        );

        return;

    }

    const reviewText =
        reviewBox.value.trim();

    if (
        reviewText === ""
    ) {

        alert(
            "📝 Please write a review."
        );

        return;

    }

    const reviews =
        getRecipeReviews(
            id
        );

    reviews.push({

        rating:
            Number(
                selectedRating.value
            ),

        text:
            reviewText,

        username:
            loggedInUser || "Guest",

        date:
            new Date()
                .toLocaleDateString()

    });

    saveRecipeReviews();


    const reviewedRecipe =
        recipes.find(
            recipe =>
                Number(recipe.id) === Number(id)
        ) ||
        (
            JSON.parse(
                localStorage.getItem("userRecipes")
            ) || []
        ).find(
            recipe =>
                Number(recipe.id) === Number(id)
        );


    addActivity(
        "review",
        `${loggedInUser || "A user"} reviewed "${reviewedRecipe ? reviewedRecipe.name : "a recipe"}" with ${selectedRating.value}/5 stars.`
    );


    alert(
        "🎉 Your rating and review have been added!"
    );

    refreshRecipeModal(
        id
    );

}


/* =========================================
   REFRESH RECIPE MODAL
========================================= */

function refreshRecipeModal(id) {

    const builtInRecipe =
        recipes.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    if (
        builtInRecipe
    ) {

        openRecipe(
            id
        );

        return;

    }

    openUserRecipe(
        id
    );

}


/* =========================================
   DISPLAY RECIPES
========================================= */

function displayRecipes(list) {

    const grid =
        document.getElementById(
            "recipeGrid"
        );

    grid.innerHTML = "";

    if (
        list.length === 0
    ) {

        grid.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
            ">

                <h2>

                    😔 No recipes found

                </h2>

                <p>

                    Try another search.

                </p>

            </div>

        `;

        return;

    }


    list.forEach(
        recipe => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "recipe-card";

            const isFavorite =
                favorites.includes(
                    recipe.id
                );

            card.innerHTML = `

                <div class="recipe-image">

                    <img
                        src="${recipe.image}"
                        alt="${recipe.name}"
                        onerror="
                            this.style.display='none';
                        ">

                    <button
                        class="favorite-btn"
                        onclick="toggleFavorite(${recipe.id})">

                        ${
                            isFavorite
                                ? "❤️"
                                : "🤍"
                        }

                    </button>

                </div>


                <div class="recipe-info">

                    <div>

                        ⭐
                        ${getRecipeRating(recipe)}

                    </div>


                    <h3>

                        ${recipe.name}

                    </h3>


                    <p>

                        ${recipe.description}

                    </p>


                    <div
                        class="recipe-meta">

                        <span>

                            ⏱
                            ${recipe.time}

                        </span>


                        <span>

                            🌶
                            ${recipe.difficulty}

                        </span>

                    </div>


                    <button
                        class="recipe-btn"
                        onclick="openRecipe(${recipe.id})">

                        View Recipe →

                    </button>

                </div>

            `;

            grid.appendChild(
                card
            );

        }
    );

}


/* =========================================
   OPEN BUILT-IN RECIPE
========================================= */

function openRecipe(id) {

    if (!requireLogin()) return;

    const recipe =
        recipes.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    if (!recipe) return;

    addActivity(
        "recipe_view",
        `${loggedInUser || "A user"} viewed "${recipe.name}".`
    );


    const modal =
        document.getElementById(
            "recipeModal"
        );

    const content =
        document.getElementById(
            "modalContent"
        );

    content.innerHTML = `

        <img
            src="${recipe.image}"
            alt="${recipe.name}"
            style="
                width:100%;
                height:280px;
                object-fit:cover;
                border-radius:18px;
                margin-bottom:25px;
            ">


        <h2>

            ${recipe.name}

        </h2>


        <p>

            ⭐
            ${getRecipeRating(recipe)}

            &nbsp;&nbsp;

            ⏱
            ${recipe.time}

            &nbsp;&nbsp;

            🌶
            ${recipe.difficulty}

        </p>


        <h3>

            🥕 Ingredients

        </h3>


        <p style="white-space:pre-line;">

            ${recipe.ingredients}

        </p>


        <h3>

            👨‍🍳 Preparation

        </h3>


        <p style="white-space:pre-line;">

            ${recipe.instructions}

        </p>


        <button
            class="publish-btn"
            onclick="
                toggleFavorite(${recipe.id});
                closeModal();
            ">

            ❤️ Add to Favorites

        </button>


        ${renderRatingReviews(recipe)}

    `;


    modal.classList.add(
        "show"
    );

}


/* =========================================
   CLOSE RECIPE MODAL
========================================= */

function closeModal() {

    document
        .getElementById(
            "recipeModal"
        )
        .classList.remove(
            "show"
        );

}


/* =========================================
   FAVORITES
========================================= */

function toggleFavorite(id) {

    if (!requireLogin()) return;

    if (
        favorites.includes(id)
    ) {

        favorites =
            favorites.filter(
                item =>
                    item !== id
            );

    } else {

        favorites.push(
            id
        );

    }


    localStorage.setItem(
        "favorites",
        JSON.stringify(
            favorites
        )
    );


    const favoriteRecipe =
        recipes.find(
            recipe => Number(recipe.id) === Number(id)
        ) ||
        (JSON.parse(localStorage.getItem("userRecipes")) || [])
            .find(recipe => Number(recipe.id) === Number(id));

    addActivity(
        "favorite",
        `${loggedInUser || "A user"} ${favorites.includes(id) ? "favorited" : "unfavorited"} "${favoriteRecipe ? favoriteRecipe.name : "a recipe"}".`
    );


    updateFavoriteCount();


    displayRecipes(
        recipes
    );


    loadUserRecipes();

}


/* =========================================
   FAVORITE COUNT
========================================= */

function updateFavoriteCount() {

    document.getElementById(
        "favoriteCount"
    ).textContent =
        favorites.length;

}


document
    .getElementById(
        "favoritesBtn"
    )
    .addEventListener(
        "click",
        showFavorites
    );


/* =========================================
   SHOW FAVORITES
========================================= */

function showFavorites() {

    if (!requireLogin()) return;

    const container =
        document.getElementById(
            "favoritesContent"
        );


    const userRecipes =
        JSON.parse(
            localStorage.getItem(
                "userRecipes"
            )
        ) || [];


    const allRecipes = [

        ...recipes,

        ...userRecipes

    ];


    const favoriteRecipes =
        allRecipes.filter(
            recipe =>
                favorites.some(
                    favoriteId =>
                        Number(favoriteId) ===
                        Number(recipe.id)
                )
        );


    if (
        favoriteRecipes.length === 0
    ) {

        container.innerHTML = `

            <p style="
                margin-top:20px;
                color:#766b64;
            ">

                You haven't saved any recipes yet. ❤️

            </p>

        `;

    } else {

        container.innerHTML =
            favoriteRecipes
                .map(
                    recipe => `

                        <div style="
                            display:flex;
                            gap:15px;
                            align-items:center;
                            margin-top:20px;
                            padding:12px;
                            background:#fff4eb;
                            border-radius:15px;
                        ">

                            <img
                                src="${recipe.image}"
                                style="
                                    width:80px;
                                    height:80px;
                                    object-fit:cover;
                                    border-radius:12px;
                                ">

                            <div>

                                <h3>

                                    ${recipe.name}

                                </h3>

                                <p>

                                    ⭐
                                    ${getRecipeRating(recipe)}

                                </p>

                                <button
                                    class="recipe-btn"
                                    onclick="
                                        openAnyRecipe(${recipe.id});
                                        closeFavorites();
                                    ">

                                    View

                                </button>

                            </div>

                        </div>

                    `
                )
                .join("");

    }


    document
        .getElementById(
            "favoritesModal"
        )
        .classList.add(
            "show"
        );

}


/* =========================================
   OPEN ANY RECIPE
========================================= */

function openAnyRecipe(id) {

    if (!requireLogin()) return;

    const builtInRecipe =
        recipes.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    if (
        builtInRecipe
    ) {

        openRecipe(
            id
        );

        return;

    }

    openUserRecipe(
        id
    );

}


/* =========================================
   CLOSE FAVORITES
========================================= */

function closeFavorites() {

    document
        .getElementById(
            "favoritesModal"
        )
        .classList.remove(
            "show"
        );

}


/* =========================================
   SEARCH
========================================= */

function searchRecipes() {

    if (!requireLogin()) return;

    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase()
            .trim();


    const filtered =
        recipes.filter(
            recipe =>

                recipe.name
                    .toLowerCase()
                    .includes(search)

                ||

                recipe.category
                    .toLowerCase()
                    .includes(search)

                ||

                recipe.description
                    .toLowerCase()
                    .includes(search)

        );


    displayRecipes(
        filtered
    );


    loadUserRecipes();


    document
        .getElementById(
            "recipes"
        )
        .scrollIntoView({
            behavior:
                "smooth"
        });

}


document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                searchRecipes();

            }

        }
    );


/* =========================================
   CATEGORY FILTER
========================================= */

function filterCategory(
    category
) {

    if (
        category ===
        "all"
    ) {

        displayRecipes(
            recipes
        );

        loadUserRecipes();

        return;

    }


    const filtered =
        recipes.filter(
            recipe =>
                recipe.category ===
                category
        );


    displayRecipes(
        filtered
    );


    document
        .getElementById(
            "recipes"
        )
        .scrollIntoView({
            behavior:
                "smooth"
        });

}


/* =========================================
   CRAVING FILTER
========================================= */

function cravingFilter(
    craving
) {

    if (
        craving ===
        "all"
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                recipes.length
            );


        openRecipe(
            recipes[randomIndex].id
        );


        return;

    }


    const filtered =
        recipes.filter(
            recipe =>
                recipe.craving ===
                craving
        );


    displayRecipes(
        filtered
    );


    document
        .getElementById(
            "recipes"
        )
        .scrollIntoView({
            behavior:
                "smooth"
        });

}


/* =========================================
   SHARE RECIPE
========================================= */

document
    .getElementById(
        "recipeForm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (!requireLogin()) return;


            const name =
                document
                    .getElementById(
                        "recipeName"
                    )
                    .value
                    .trim();


            const cuisine =
                document
                    .getElementById(
                        "recipeCuisine"
                    )
                    .value;


            const time =
                document
                    .getElementById(
                        "recipeTime"
                    )
                    .value
                    .trim();


            const difficulty =
                document
                    .getElementById(
                        "recipeDifficulty"
                    )
                    .value;


            const imageInput =
                document.getElementById(
                    "recipeImage"
                );


            const imageFile =
                imageInput.files[0];


            if (
                !imageFile
            ) {

                alert(
                    "📸 Please choose a recipe image."
                );

                return;

            }


            if (
                !imageFile.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "❌ Please choose a valid image file."
                );

                return;

            }


            const ingredients =
                document
                    .getElementById(
                        "recipeIngredients"
                    )
                    .value
                    .trim();


            const instructions =
                document
                    .getElementById(
                        "recipeInstructions"
                    )
                    .value
                    .trim();


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    const imageData =
                        event.target.result;


                    const userRecipe = {

                        id:
                            Date.now(),

                        name:
                            name,

                        category:
                            cuisine,

                        craving:
                            "all",

                        image:
                            imageData,

                        rating:
                            5,

                        time:
                            time,

                        difficulty:
                            difficulty,

                        description:
                            "A delicious recipe shared by our community.",

                        ingredients:
                            ingredients,

                        instructions:
                            instructions

                    };


                    let userRecipes =
                        JSON.parse(
                            localStorage.getItem(
                                "userRecipes"
                            )
                        ) || [];


                    userRecipes.push(
                        userRecipe
                    );


                    localStorage.setItem(
                        "userRecipes",
                        JSON.stringify(
                            userRecipes
                        )
                    );


                    addActivity(
                        "recipe",
                        `${loggedInUser || "A user"} shared the recipe "${name}".`
                    );


                    alert(
                        "🎉 Your recipe has been shared successfully!"
                    );


                    document
                        .getElementById(
                            "recipeForm"
                        )
                        .reset();


                    displayRecipes(
                        recipes
                    );


                    loadUserRecipes();


                    document
                        .getElementById(
                            "recipes"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                };


            reader.readAsDataURL(
                imageFile
            );

        }
    );


/* =========================================
   LOAD USER RECIPES
========================================= */

function loadUserRecipes() {

    const userRecipes =
        JSON.parse(
            localStorage.getItem(
                "userRecipes"
            )
        ) || [];


    const grid =
        document.getElementById(
            "recipeGrid"
        );


    const oldCards =
        grid.querySelectorAll(
            ".user-recipe-card"
        );


    oldCards.forEach(
        card =>
            card.remove()
    );


    if (
        userRecipes.length === 0
    ) {

        return;

    }


    userRecipes.forEach(
        recipe => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "recipe-card user-recipe-card";


            card.innerHTML = `

                <div class="recipe-image">

                    <img
                        src="${recipe.image}"
                        alt="${recipe.name}"
                        onerror="
                            this.style.display='none';
                        ">

                </div>


                <div class="recipe-info">

                    <div>

                        ⭐
                        ${getRecipeRating(recipe)}

                        &nbsp;

                        Community Recipe

                    </div>


                    <h3>

                        ${recipe.name}

                    </h3>


                    <p>

                        ${recipe.description}

                    </p>


                    <div
                        class="recipe-meta">

                        <span>

                            ⏱
                            ${recipe.time}

                        </span>


                        <span>

                            🌶
                            ${recipe.difficulty}

                        </span>

                    </div>


                    <div
                        class="community-buttons">

                        <button
                            class="recipe-btn"
                            onclick="
                                openUserRecipe(${recipe.id})
                            ">

                            View Recipe →

                        </button>


                        <button
                            class="delete-btn"
                            onclick="
                                deleteUserRecipe(${recipe.id})
                            ">

                            🗑️ Delete

                        </button>

                    </div>

                </div>

            `;


            grid.appendChild(
                card
            );

        }
    );

}


/* =========================================
   OPEN USER RECIPE
========================================= */

function openUserRecipe(
    id
) {

    if (!requireLogin()) return;

    const userRecipes =
        JSON.parse(
            localStorage.getItem(
                "userRecipes"
            )
        ) || [];


    const recipe =
        userRecipes.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (
        !recipe
    ) {

        alert(
            "Recipe not found."
        );

        return;

    }


    addActivity(
        "recipe_view",
        `${loggedInUser || "A user"} viewed "${recipe.name}".`
    );


    const modal =
        document.getElementById(
            "recipeModal"
        );


    const content =
        document.getElementById(
            "modalContent"
        );


    content.innerHTML = `

        <img
            src="${recipe.image}"
            alt="${recipe.name}"
            style="
                width:100%;
                height:280px;
                object-fit:cover;
                border-radius:18px;
                margin-bottom:20px;
                display:block;
            ">


        <h2>

            ${recipe.name}

        </h2>


        <p>

            ⭐
            ${getRecipeRating(recipe)}

            &nbsp;&nbsp;

            Community Recipe

        </p>


        <p>

            ⏱
            ${recipe.time}

            &nbsp;&nbsp;

            🌶
            ${recipe.difficulty}

        </p>


        <h3>

            🥕 Ingredients

        </h3>


        <p style="white-space:pre-line;">

            ${recipe.ingredients}

        </p>


        <h3>

            👨‍🍳 Preparation

        </h3>


        <p style="white-space:pre-line;">

            ${recipe.instructions}

        </p>


        <div
            class="community-buttons">

            <button
                class="delete-btn"
                onclick="
                    deleteUserRecipe(${recipe.id})
                ">

                🗑️ Delete Recipe

            </button>

        </div>


        ${renderRatingReviews(recipe)}

    `;


    modal.classList.add(
        "show"
    );

}


/* =========================================
   DELETE PUBLISHED / COMMUNITY RECIPE
========================================= */

function deleteUserRecipe(
    id
) {

    const userRecipes =
        JSON.parse(
            localStorage.getItem(
                "userRecipes"
            )
        ) || [];


    const recipe =
        userRecipes.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (
        !recipe
    ) {

        alert(
            "Recipe not found."
        );

        return;

    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${recipe.name}"?`
        );


    if (
        !confirmDelete
    ) {

        return;

    }


    const updatedRecipes =
        userRecipes.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    localStorage.setItem(
        "userRecipes",
        JSON.stringify(
            updatedRecipes
        )
    );


    delete recipeReviews[
        String(id)
    ];


    saveRecipeReviews();


    closeModal();


    loadUserRecipes();


    alert(
        "🗑️ Recipe deleted successfully!"
    );

}


/* =========================================
   INGREDIENT-BASED RECIPE FINDER
========================================= */

function findRecipesByIngredients() {

    if (!requireLogin()) return;

    const input =
        document
            .getElementById(
                "ingredientInput"
            )
            .value
            .toLowerCase()
            .trim();


    const results =
        document.getElementById(
            "ingredientResults"
        );


    if (
        input === ""
    ) {

        results.innerHTML = `

            <div
                class="ingredient-message">

                <h3>

                    🥕 Please enter some ingredients

                </h3>


                <p>

                    Example:
                    chicken, onion, tomato

                </p>

            </div>

        `;


        return;

    }


    const userIngredients =
        input
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(
                item =>
                    item !== ""
            );


    const userRecipes =
        JSON.parse(
            localStorage.getItem(
                "userRecipes"
            )
        ) || [];


    const allRecipes = [

        ...recipes,

        ...userRecipes

    ];


    const matchedRecipes =
        allRecipes

            .map(
                recipe => {

                    const recipeIngredients =
                        String(
                            recipe.ingredients ||
                            ""
                        )
                            .toLowerCase()
                            .split("\n")
                            .map(
                                item =>
                                    item.trim()
                            )
                            .filter(
                                item =>
                                    item !== ""
                            );


                    const matchedIngredients =
                        userIngredients.filter(
                            userIngredient =>

                                recipeIngredients.some(
                                    recipeIngredient =>

                                        recipeIngredient.includes(
                                            userIngredient
                                        )

                                )
                        );


                    return {

                        recipe:
                            recipe,

                        matched:
                            matchedIngredients.length,

                        matchedIngredients:
                            matchedIngredients

                    };

                }
            )

            .filter(
                item =>
                    item.matched > 0
            )

            .sort(
                (a, b) =>
                    b.matched -
                    a.matched
            );


    if (
        matchedRecipes.length === 0
    ) {

        results.innerHTML = `

            <div
                class="ingredient-message">

                <h3>

                    😔 No matching recipes found

                </h3>


                <p>

                    Try different ingredients.

                </p>

            </div>

        `;


        return;

    }


    results.innerHTML = `

        <h3
            class="ingredient-result-title">

            🍽️ Recipes You Can Try

        </h3>


        <div
            class="ingredient-result-grid">

            ${
                matchedRecipes
                    .map(
                        item => {

                            const recipe =
                                item.recipe;


                            const matchedText =
                                item
                                    .matchedIngredients
                                    .join(
                                        ", "
                                    );


                            return `

                                <div
                                    class="ingredient-recipe-card">

                                    <img
                                        src="${recipe.image}"
                                        alt="${recipe.name}"
                                        onerror="
                                            this.style.display='none';
                                        ">


                                    <div
                                        class="ingredient-recipe-info">

                                        <h3>

                                            ${recipe.name}

                                        </h3>


                                        <p>

                                            ⭐
                                            ${getRecipeRating(recipe)}

                                        </p>


                                        <p>

                                            ⏱
                                            ${recipe.time}

                                        </p>


                                        <p
                                            class="matched-text">

                                            ✓ Matching ingredients:
                                            ${matchedText}

                                        </p>


                                        <button
                                            class="recipe-btn"
                                            onclick="
                                                openIngredientRecipe(${recipe.id})
                                            ">

                                            View Recipe →

                                        </button>

                                    </div>

                                </div>

                            `;

                        }
                    )
                    .join("")
            }

        </div>

    `;

}


/* =========================================
   OPEN RECIPE FROM INGREDIENT FINDER
========================================= */

function openIngredientRecipe(
    id
) {

    if (!requireLogin()) return;

    const builtInRecipe =
        recipes.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (
        builtInRecipe
    ) {

        openRecipe(
            id
        );

        return;

    }


    openUserRecipe(
        id
    );

}


/* =========================================
   ENTER KEY FOR INGREDIENT SEARCH
========================================= */

document
    .getElementById(
        "ingredientInput"
    )
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                findRecipesByIngredients();

            }

        }
    );


/* =========================================
   DARK MODE
========================================= */

document
    .getElementById(
        "darkModeBtn"
    )
    .addEventListener(
        "click",
        function() {

            document
                .body
                .classList
                .toggle(
                    "dark"
                );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                localStorage.setItem(
                    "darkMode",
                    "enabled"
                );


                this.textContent =
                    "☀️";


            } else {

                localStorage.removeItem(
                    "darkMode"
                );


                this.textContent =
                    "🌙";

            }

        }
    );


/* =========================================
   LOAD DARK MODE
========================================= */

if (
    localStorage.getItem(
        "darkMode"
    ) ===
    "enabled"
) {

    document
        .body
        .classList
        .add(
            "dark"
        );


    document
        .getElementById(
            "darkModeBtn"
        )
        .textContent =
        "☀️";

}


/* =========================================
   INITIAL LOAD
========================================= */

displayRecipes(
    recipes
);


updateFavoriteCount();


loadUserRecipes();


updateAuthUI();
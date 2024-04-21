const mongoose = require('mongoose');

// Replace the connection string with your MongoDB Atlas connection string
mongoose.connect('mongodb+srv://akashvangadi47:BHRko6IwaHK6Ca4k@cluster3.s9nf1gz.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Define your schemas and models here

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('Users', UserSchema);

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgsrc: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const ProductModel = mongoose.model('products', ProductSchema);

const ProdSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartSchema = new mongoose.Schema({
    products: [ProdSchema],
    total: Number
}, { timestamps: true });

const HistorySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    curr_cart: {
        type: [ProdSchema],
    },
    cart_history: {
        type: [CartSchema],
        default: []
    }
});

const HistoryModel = mongoose.model('History', HistorySchema);

// Function to generate random user data
function generateRandomUser() {
    const randomEmail = `user_${Math.floor(Math.random() * 10000)}@example.com`;
    return {
        email: randomEmail,
        password: 'password123'
    };
}

// Function to generate random product data
function generateRandomProduct() {
    return {
        name: `Product_${Math.floor(Math.random() * 100)}`,
        imgsrc: `frontend\src\dosa.png`,
        desc: `Description of product_${Math.floor(Math.random() * 100)}`,
        price: Math.floor(Math.random() * 100) + 1
    };
}

// Function to generate random cart data
function generateRandomCart() {
    const randomProduct = generateRandomProduct();
    return {
        products: [{ product: randomProduct.name, quantity: Math.floor(Math.random() * 5) + 1 }],
        total: randomProduct.price * (Math.floor(Math.random() * 5) + 1)
    };
}

// Function to generate random history data
function generateRandomHistory() {
    const randomUser = generateRandomUser();
    const randomCart = generateRandomCart();
    return {
        user: randomUser.email,
        curr_cart: randomCart.products,
        cart_history: [randomCart]
    };
}

// Function to insert random data into the database
async function insertRandomData() {
    try {
        // Insert random user data
        const randomUser = generateRandomUser();
        await UserModel.create(randomUser);
        console.log('Random user data inserted:', randomUser);

        // Insert random product data
        const randomProduct = generateRandomProduct();
        await ProductModel.create(randomProduct);
        console.log('Random product data inserted:', randomProduct);

        // Insert random history data
        const randomHistory = generateRandomHistory();
        await HistoryModel.create(randomHistory);
        console.log('Random history data inserted:', randomHistory);
    } catch (error) {
        console.error('Error inserting random data:', error);
    } finally {
        mongoose.disconnect();
    }
}

// Call the function to insert random data
insertRandomData();

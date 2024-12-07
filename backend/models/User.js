import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Оголошення схеми користувача
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/300",
    },
  },
  {
    timestamps: true,
  }
);

// **Хешування пароля перед збереженням**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Якщо пароль не змінено, пропускаємо хешування
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// **Метод для перевірки пароля**
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);

// // models/User.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// // Оголошення схеми користувача
// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: [true, 'Name is required'],
//             trim: true,
//         },
//         email: {
//             type: String,
//             required: [true, 'Email is required'],
//             unique: true,
//             lowercase: true,
//             match: [
//                 /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 'Please provide a valid email address',
//             ],
//         },
//         password: {
//             type: String,
//             required: [true, 'Password is required'],
//             minlength: [6, 'Password must be at least 6 characters'],
//         },
//         role: {
//             type: String,
//             enum: ['user', 'admin'], // Визначення можливих ролей
//             default: 'user', // Роль за замовчуванням
//         },
//         avatar: {
//             type: String,
//             default:
//                 'https://www.gravatar.com/avatar/?d=mp', // URL аватара за замовчуванням
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// // **Хешування пароля перед збереженням**
// // userSchema.pre('save', async function (next) {
// //     if (!this.isModified('password')) {
// //         return next(); // Якщо пароль не змінено, пропускаємо хешування
// //     }
// //     try {
// //         const salt = await bcrypt.genSalt(10);
// //         this.password = await bcrypt.hash(this.password, salt);
// //         next();
// //     } catch (error) {
// //         next(error);
// //     }
// // });

// // **Метод для перевірки пароля**
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);

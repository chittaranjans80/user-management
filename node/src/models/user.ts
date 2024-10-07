import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

export default User;

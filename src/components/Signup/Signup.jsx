import React from "react";
import { InputFild, Button } from "../index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authservice.createAccount(data);

      if (userData) {
        await authservice.getCurrentUser(userData);

        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <he>SignIn in your Account</he>
        {/* handleSubmit is predefin method by react-hook-form/useForm , we give our mathod to  */}
        <form onSubmit={handleSubmit(create)}>
          <div>
            <InputFild
                label='Fullname:'
                placeHolder="Enter fullname"
                type="text"
                {...register("name" , {required:true})}
            />
            <InputFild
              label="email"
              placeHolder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
            <InputFild
              label="password"
              type="password"
              placeHolder="Enter password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full bg-bule-400 ">
              create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

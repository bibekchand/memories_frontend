import { Toast } from "@heroui/react";
import { Link } from "react-router";
import useUser from "../hooks/useUser.jsx";
import HeroImage from "../assests/loginHeroImage.png";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    Typography,
} from "@heroui/react";
import useTheme from "../hooks/useTheme";
import { useThemeStore } from "../store/useThemeStore.jsx";
export default function Login() {
    const theme = useThemeStore((state) => state.theme);
    useTheme();
    const { login } = useUser();
    return (
        <div className="w-full justify-center grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="h-full hidden md:block">
                <img src={HeroImage} alt="" />
            </div>
            <div className="flex flex-col justify-center md:items-start  items-center relative">
                <Typography.Heading level={1} className="absolute top-40">
                    {" "}
                    Welcome back, <br /> Login here
                </Typography.Heading>
                <Form className="flex flex-col gap-4 " onSubmit={login}>
                    <TextField
                        isRequired
                        name="username"
                        variant={theme === "dark" ? "secondary" : ""}
                    >
                        <Label>Username</Label>
                        <Input placeholder="ramshah" />
                    </TextField>

                    <TextField
                        variant={theme === "dark" ? "secondary" : ""}
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters</Description>
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2">
                        <Button type="submit">Login</Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                    <Link to="/register" className="underline text-blue-500">
                        Don't have an account?
                    </Link>
                </Form>
            </div>
            <Toast.Provider />
        </div>
    );
}

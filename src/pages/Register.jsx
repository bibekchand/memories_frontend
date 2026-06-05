import { Toast } from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import useUser from "../hooks/useUser.jsx";
import HeroImage from "../assests/registerHeroImage.png";
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
import useTheme from "../hooks/useTheme.jsx";
import { useThemeStore } from "../store/useThemeStore.jsx";
export default function Register() {
    const theme = useThemeStore((state) => state.theme);
    useTheme();
    const { signUp } = useUser();
    return (
        <div className="w-full justify-center grid md:grid-cols-2 grid-cols-1 h-screen">
            <div className="h-full hidden md:block">
                <img src={HeroImage} alt="" />
            </div>
            <div className="flex flex-col justify-center md:items-start items-center relative">
                <Typography.Heading level={1} className="absolute top-40">
                    {" "}
                    Welcome, <br /> Register here
                </Typography.Heading>
                <Form className="flex w-96 flex-col gap-4 p-2 md:p-0" onSubmit={signUp}>
                    <TextField
                        isRequired
                        variant={theme === "dark" ? "secondary" : ""}
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="ramshah@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        variant={theme === "dark" ? "secondary" : ""}
                        isRequired
                        name="username"
                        type="text"
                        validate={(value) => {
                            if (value.length === 0) return "Please enter a valid username";
                            return null;
                        }}
                    >
                        <Label>Username</Label>
                        <Input placeholder="ramshah" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        variant={theme === "dark" ? "secondary" : ""}
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
                        <Description>
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2">
                        <Button type="submit">
                            <Check />
                            Submit
                        </Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
            <Toast.Provider />
        </div>
    );
}

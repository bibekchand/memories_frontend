import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { useThemeStore } from "../store/useThemeStore.jsx";
export default function AddProjects({ addProject }) {
    const theme = useThemeStore((state) => state.theme);
    return (
        <div className="w-full">
            <Form className="flex flex-col" onSubmit={addProject}>
                <TextField
                    name="name"
                    variant={theme === "light" ? "primary" : "secondary"}
                    validate={(value) => {
                        if (value.length === 0) return "Please enter a name";
                        else return null;
                    }}
                >
                    <Label>Project Name</Label>
                    <Input placeholder="Name your project" />
                    <FieldError />
                </TextField>

                <TextField
                    className="mt-2 mb-2"
                    name="description"
                    variant={theme === "light" ? "primary" : "secondary"}
                >
                    <Label>Project description</Label>
                    <Input placeholder="Describe your project" />
                    <FieldError />
                </TextField>
                <div className="flex gap-2 mt-2">
                    <Button className="bg-red-500" slot="close" type="button">
                        Cancel
                    </Button>
                    <Button type="submit">Add</Button>
                </div>
            </Form>
        </div>
    );
}

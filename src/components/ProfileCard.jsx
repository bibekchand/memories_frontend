import { ArrowRightToSquare } from "@gravity-ui/icons";
import { Description, Header, Label, ListBox } from "@heroui/react";
import useUser from "../hooks/useUser.jsx";
import useUserInfoStore from "../store/useUserInfoStore.jsx";
export default function ProfileCard() {
    const username = useUserInfoStore((state) => state.username);
    const userEmail = useUserInfoStore((state) => state.userEmail);
    const { signOut } = useUser();
    return (
        <ListBox aria-label="Users" className="w-55" selectionMode="none">
            <ListBox.Section>
                <Header>Profile</Header>
                <ListBox.Item id="1">
                    <div className="flex flex-col">
                        <Label>{username}</Label>
                        <Description>{userEmail}</Description>
                    </div>
                    <ListBox.ItemIndicator />
                </ListBox.Item>
            </ListBox.Section>
            <ListBox.Item id="2" variant="danger">
                <div
                    className="flex h-8 items-center justify-center pt-px gap-5"
                    onClick={signOut}
                >
                    <ArrowRightToSquare className="size-5 text-danger" />
                    <span className="text-red-500">Sign Out</span>
                </div>
            </ListBox.Item>
            <ListBox.Section></ListBox.Section>
        </ListBox>
    );
}

import { useMutation } from "@tanstack/react-query";
import { authAPI } from "../services/authAPI";
import { useAuthContext } from "../auth/AuthProvider";

export const useAuth = () => {
    const { login, logout } = useAuthContext();

    const loginMutation = useMutation({
        mutationFn: authAPI.login,
        onSuccess: (data) => {
            login(data.accessToken);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: authAPI.logout,
        onSuccess: () => logout(),
    });

    return { loginMutation, logoutMutation };
};

import { queryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./keys";
import { currentUser } from "../actions/auth.action";

export const authQueryOptions = {
    currentUser: () =>
        queryOptions({
            queryKey: QueryKeys.CURRENT_USER,
            queryFn: currentUser,
        }),
};

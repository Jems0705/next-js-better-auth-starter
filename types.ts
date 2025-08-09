type APISuccess<T> = {
    success: true;
    message?: string;
    data?: T;
};

type APIError<E = unknown> = {
    success: false;
    message?: string;
    code?: string;
    errors?: E;
};

export type ApiResponse<T = unknown, E = unknown> = APISuccess<T> | APIError<E>;

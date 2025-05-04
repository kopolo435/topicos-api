import { AssertError } from "./error";

export type QueryParam = `${string}=${string}`;

export const buildUrl = (baseUrl: string, path: string, ...queryParams: Array<QueryParam>): URL => {
    const url = new URL(baseUrl);
    url.pathname = path

    if (queryParams) {
        queryParams.forEach((param) => {
            const [key, value] = param.split("=");
            url.searchParams.set(key, value);
        });
    }

    return url;
}

export const inputDateValueFormat = (date?: Date): string => {
    if (!date) {
        date = new Date();
    } else if (date && typeof date === "string") {
        date = new Date(date);
    }

    const pad = (n: number) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const objectEmpty = (obj?: object): boolean => {
    if(!obj) return true;
    return Object.keys(obj).length === 0;
}

export const assert = (condition: boolean, message: string = "Assertion failed."): void => {
    if(!condition) {
        throw new AssertError(message);
    }
}
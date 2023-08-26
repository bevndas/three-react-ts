import {Dispatch, SetStateAction} from "react";

export type StateArray<T> = [T, Dispatch<SetStateAction<T>>]|[T, (values: T|((current: T) => T)) => void];

export type  Point = {
    x: number;
    y: number;
}
export type  NDCPoint = {
    x: number;
    y: number;
    z: number;
}

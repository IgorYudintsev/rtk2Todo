import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/middleware/store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
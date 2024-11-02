import {RootState} from "../../app/middleware/store.ts";
import {useSelector} from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>()
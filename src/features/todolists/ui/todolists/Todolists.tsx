import {deleteTodolist, InitialType} from "../../model/todolists-reducer.ts";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch.ts";


export const Todolists = (props: InitialType) => {
    const {id, filter, order, title, addedDate} = props
    const dispatch = useAppDispatch()
    const deleteTodolistHandler = (id) => {
        dispatch(deleteTodolist({id}))
    }

    return (
        <tr key={id}>
            <td>{title}</td>
            <td>{filter}</td>
            <td>{order}</td>
            <td>
                <button className="delete-button" onClick={() => deleteTodolistHandler(id)}>Delete</button>
            </td>
        </tr>

    );

};
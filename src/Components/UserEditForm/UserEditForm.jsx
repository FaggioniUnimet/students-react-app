import Button from "../UI/Button/Button";
import styles from "./UserEditForm.module.css"
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/Context";
import { useContext } from 'react'
import { currentLog } from "../../utils/firebaseConfig";
const UserEditForm = (props) => {
    const { user } = useContext(UserContext)
    const {
        register,
        handleSubmit,
        formState,
        getFieldState
    } = useForm({
        mode: "onChange",
        defaultValues: {
            displayName: user.displayName,
        }
    })

    const onSubmit = (data) => {
        console.log(user)
        console.log
        currentLog().updateProfile({ displayName: data.displayName })
        props.onEdit()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label
                htmlFor="nombre"
                id="nombre">
                Nombre Completo
            </label>
            <input
                {...register(
                    "displayName",
                    {
                        required: 'Por favor ingrese su nombre',
                        minLength: {
                            value: 4,
                            message: 'Por favor ingrese un nombre válido'
                        }
                    })}
                type="text"
                placeholder="Enter a name"
            />
            <Button type='submit'>Confirm</Button>
        </form>
    )
}
export default UserEditForm
//       .dy`                               `yh           
//        -dh.                             `hd.           
//         .hm:                           .dh.            
//          `oms`      .:+ossso+:-       +mo`             
//            -hm/  :shs+:-...-/+shs:  -hd:               
//             `/dddh/`           `/hdymo`                
//               sNdm+.           `:hmNh`                 
//              +N:`:ydh+:.   `./sdh+.-ms                 
//`````````````.Ny`   .:shhhyyhyy/.`   /M:  ``````````    
//oyyyyyyyyyyyyhMdyyyyyyys.-My.:yyyyyyyyMdyyyyyyyyyyyy.   
//`````````````:M+````````  No  ```````.Ms````````````    
//              mh          -`         /M:                
//              -No         .`        .my                 
//               :my-       ds      `/ms`                 
//                .sds-`    mh    ./hh:                   
//                  .+hdho/:Nd:+shds:`                    
//                 .:+ydmyooooooyddyo/.`                  
//             `-oydy+:.          .:+ydhs/.               
//          `-sdho-`                   -/ydy/.            
//        .odd+.                          `/ymy:`         
//       -ymy-                                .+dh+`       
//     .hmo`                                     /hs    
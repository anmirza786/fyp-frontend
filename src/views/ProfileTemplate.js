import LinkComponenets from "myaccount/linkComponents/linkComponent";
import OptionBar from "myaccount/optionBar/optionBar";

const ProfileTemplate=(props)=>{
  
    return (<>
    <OptionBar />
    <LinkComponenets>
    {props.children}
    </LinkComponenets>    
    </>);
  }
 
export default ProfileTemplate;
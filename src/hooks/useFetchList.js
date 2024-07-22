import { crm } from "../services/suitecrm";
import useFetchData from "./useFetchData";

const useFetchList = (module) => useFetchData(crm.getLitsUrl(module));
export default useFetchList;

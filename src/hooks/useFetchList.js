import { crm } from "../services/suitecrm";
import useFetchData from "./useFetchData";

const useFetchList = (module, sort) => useFetchData(crm.getLitsUrl(module, sort));
export default useFetchList;

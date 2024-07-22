import { crm } from "../services/suitecrm";
import useFetchData from "./useFetchData";

const useFetchModules = () => useFetchData(crm.getModulesUrl());

export default useFetchModules;

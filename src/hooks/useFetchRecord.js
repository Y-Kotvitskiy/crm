import { crm } from "../services/suitecrm";
import useFetchData from "./useFetchData";

const useFetchRecord = (module, id) =>
  useFetchData(crm.getRecordUrl(module, id));

export default useFetchRecord;

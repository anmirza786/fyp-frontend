import { REQUEST_URL } from "../../actions/Constant";
import http from "../../services/httpService";

export function ViewCompetitions() {
  return http.get(REQUEST_URL + "/api/competitions/");
}
export function ViewInPreparedCompetitions() {
  return http.get(REQUEST_URL + "/api/competitions/published-competitions");
}

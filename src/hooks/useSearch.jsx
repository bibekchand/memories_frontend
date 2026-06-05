import { useState } from "react";
import { getSearchResults } from "../services/searchServices";

export default function useSearch() {
    const [searchedProjectList, setSearchedProjectList] = useState([]);
    const [searchedTaskList, setSearchedTaskList] = useState([]);
    async function searchQuery(e) {
        const query = e.target.value;
        if (query.length < 3) return;
        const response = await getSearchResults(query);
        setSearchedProjectList(response.data.projects);
        setSearchedTaskList(response.data.tasks);
        console.log("Search Result=>", response.data.projects)
    }
    return { searchedTaskList, searchedProjectList, searchQuery };
}

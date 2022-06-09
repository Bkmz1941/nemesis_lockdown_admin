export default class ApiService {
    private static url: string = "http://localhost:8001";

    public static async fetch(path: string) {
        var response = await fetch(this.url + path)
        var result = await response.json();
        
        return result;
    }
}
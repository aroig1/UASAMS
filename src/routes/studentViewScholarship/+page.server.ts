import type { D1Database } from "@cloudflare/workers-types";
import type { PageServerLoad } from "../donorScholarships/$types";

export const load: PageServerLoad = async({locals, platform}) => {
    const db = platform?.env.DB as D1Database;
    const scholarships = await db
        .prepare("SELECT * FROM scholarships WHERE donorID = ?")
        .bind(locals.user?.id)
        .all();

    return {
        scholarships: scholarships.results
    };
};
import type {PageServerLoad} from "./$types";
import type {D1Database} from "@cloudflare/workers-types";
import {checkScholarshipTableExists} from "$lib/util";

export const load: PageServerLoad = async ({locals, platform}) => {
    const db = platform?.env.DB as D1Database;
    await checkScholarshipTableExists(db);

    const scholarships = await db.prepare("SELECT * FROM scholarships WHERE archived = ?").bind(false).all();

    return {
        scholarships: scholarships.results
    };
};

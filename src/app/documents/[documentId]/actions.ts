"use server"

import {auth, clerkClient} from "@clerk/nextjs/server"

export async function getUsers(){
    console.log("DEBUG SERVER ACTION: getUsers function started.");
    const { sessionClaims } = await auth();

    // --- LOGIC BLOCK 1: CLERK SESSION CLAIMS ---
    if (!sessionClaims) {
        // If claims are missing, we can't get the org ID, so return an empty list or throw an error
        return [];
    }

    // Determine the organization ID, checking for the nested 'o.id' based on previous debugging
    const userOrgId = sessionClaims?.org_id || sessionClaims?.o?.id;
    if (!userOrgId) {
        return [];
    }

    const clerk = await clerkClient();

    try {
        // --- LOGIC BLOCK 2: CALLING CLERK API ---
        const response = await clerk.users.getUserList({
            organizationId: [userOrgId],
        });

        const users = response.data.map((user) => ({
            id: user.id,
            name: user.fullName ?? "Anonymous",
            avatar: user.imageUrl,
        }));
        return users
        
    } catch (e) {
        console.error("DEBUG SERVER ACTION CRITICAL ERROR: Failed to fetch users from Clerk.", e);
        // Throw or return empty array if the Clerk API call fails
        return [];
    }
}
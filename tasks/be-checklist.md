## Task for the Interviewee: Implementing the "Checklist" Feature

### Goal

The candidate will implement a "checklist" feature to guide users through specific activities within the app. Users will be rewarded upon completing the checklist.

### Feature Requirements

1. **Checklist Creation:**

   - The application will feature global checklists that all users can complete.
   - Although different checklists can exist, the initial implementation will include a single checklist with steps described in the "Checklist Steps" section below.

2. **Checklist Steps:**

   - **Like your first Pokémon:** The user must like any Pokémon for the first time.
   - **Add your first comment:** The user must comment on any Pokémon for the first time.
   - **Add a Water-type Pokémon to your collection:** The user must add a Water-type Pokémon to their collection.

3. **Tracking Progress:**

   - The app should track user progress for each checklist step.
   - Completed steps should be visibly marked as such.

4. **Rewards System:**

   - Upon completing all checklist steps, the user should receive a reward (e.g., a badge, points, or an in-app notification).

5. **Backend Implementation:**

   - Design the database schema for the checklist feature.
   - Implement the necessary API routes and handlers using Next.js to manage checklist features. You can use whatever technique you prefer for this, including API routes, server actions, or other methods that suit your design.
   - Ensure the checklist state is stored and retrieved from the SQLite database.

6. **Frontend Integration (Optional):**

   - Provide clear API endpoints for the frontend to display checklist progress.
   - Integrate with the existing frontend logic to show the checklist and progress to users.

7. **Testing & Documentation (Optional):**

   - Write unit and integration tests to ensure the checklist feature is functioning correctly.
   - Provide brief documentation detailing the backend implementation of the checklist feature.

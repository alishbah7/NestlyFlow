# Data Model

This document defines the data entities for the To-Do Application.

## To-Do Item

Represents a single task in the to-do list.

### Fields

| Field         | Type      | Description                                     | Constraints                |
|---------------|-----------|-------------------------------------------------|----------------------------|
| `id`          | Integer   | The unique identifier for the task.             | Primary Key, Auto-incrementing |
| `title`       | String    | The title of the task.                          | Not Null, Max 255 chars    |
| `description` | Text      | A more detailed description of the task.        | Nullable                   |
| `completed`   | Boolean   | The completion status of the task.              | Not Null, Default: `false` |
| `due_at`      | Timestamp | The date and time the task is due.              | Nullable                   |
- **FR-004**: Each to-do item MUST have an id, title, description, completion status, due date, creation date, and update date.
| `created_at`  | Timestamp | The date and time the task was created.         | Not Null, Default: `NOW()` |
| `updated_at`  | Timestamp | The date and time the task was last updated.    | Not Null, Default: `NOW()` |

### State Transitions

- A To-Do Item is created with `completed` as `false`.
- The `completed` status can be toggled between `true` and `false` by the user.
- The `updated_at` timestamp is automatically updated whenever a change is made to the item.

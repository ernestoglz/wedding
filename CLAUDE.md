# Claude Development Guidelines

## General Principles

- **Readability and Clarity:** Write code that is easy to understand at a glance.
- **Consistency:** Maintain uniform naming, formatting, and structural patterns throughout the codebase.
- **DRY (Don't Repeat Yourself):** Avoid duplicating code; promote reusable functions and components.
- **Modularity and Reusability:** Break down functionality into small, independent, and reusable modules or components.

## Code Style & Formatting

- **ESLint & Prettier:** Mandatory. Enforce semicolons, trailing commas, 2-space indentation, single quotes.
- **Trailing Newlines:** Always add a newline at the end of every file.
- **Naming Conventions:**
  - **Components/Files:** `PascalCase` (e.g., `MyComponent.tsx`)
  - **Variables/Functions/Hooks:** `camelCase` (e.g., `useAuth.ts`)
  - **Constants:** `UPPER_SNAKE_CASE`
- **Imports:** Order: React/Native → third-party → `@/` absolute paths → relative paths
- **Types:** Always use `type` instead of `interface`

## Project Structure

```
modules/
  MyModule/
    index.ts              // Named export only
    MyModule.tsx          // Main component
    styles.ts             // createStyles(theme) function
    types.ts              // Business logic types
    mocks.ts              // Mock data
    utils.ts              // Pure utility functions
    schema.ts             // Zod schemas (forms)
    hooks/
      useActions.ts       // State & business logic
    stores/
      useMyStore.ts       // Zustand store
    components/           // Sub-components (recursive structure)
```

**Key Rules:**
- One component per `.tsx` file
- Named exports only (no default exports)
- Never import between modules - use `/components/primitives` for shared UI
- Always use `@/` path aliases, never relative paths for cross-directory imports

## Components

### Props Pattern

```typescript
type IProps = {
  title: string;
  onPress: () => void;
};

export const MyComponent = (props: IProps) => {
  const { title, onPress } = props;  // Destructure on second line
  // ...
};
```

### Theming (Required)

All components must use dynamic theming:

```typescript
// styles.ts
import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
  });

// Component.tsx
import { useTheme } from "@/theme";
import { createStyles } from "./styles";

export const MyComponent = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  // ...
};
```

### Primitive Components

Located in `/components/primitives`. Check here before creating new foundational UI elements.

**Loading States:**
- **Page/Screen loading:** Use `LoadingSpinner` from `@/components/primitives`, never `ActivityIndicator`
- **Button loading (submit states):** Use the Button's built-in `loading` prop, which uses `ActivityIndicator` internally

```typescript
// Page loading
import { LoadingSpinner } from "@/components/primitives";
<LoadingSpinner size="large" />  // "small" | "medium" | "large"

// Button with loading state
<Button title="Submit" loading={submitting} disabled={submitting} />
```

## State Management

### Zustand Stores

- **Location:** `modules/ModuleName/stores/` or top-level `stores/` for global state
- **Naming:** `useStoreNameStore` (e.g., `useUserStore`)
- **Access:** Through `hooks/useActions.ts`, never directly in components

```typescript
// stores/useMyStore.ts
import { create } from "zustand";
import { apiClient } from "@/network";

type MyStore = {
  items: Item[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  resetStore: () => void;
};

export const useMyStore = create<MyStore>((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get<Item[]>("/api/items");
      set({ items: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch", loading: false });
    }
  },

  resetStore: () => set({ items: [], loading: false, error: null }),
}));
```

### useActions Hook Pattern

For components with complex state/logic, create `hooks/useActions.ts`:

```typescript
// hooks/useActions.ts
export const useActions = () => {
  const items = useMyStore((state) => state.items);
  const loading = useMyStore((state) => state.loading);
  const fetchItems = useMyStore((state) => state.fetchItems);

  const [showModal, setShowModal] = useState(false);

  const handleItemPress = (itemId: string) => {
    router.push({ pathname: "/details", params: { itemId } });
  };

  return {
    items,
    loading,
    showModal,
    handleItemPress,
    setShowModal,
  };
};

// Component.tsx - clean and simple
export const MyComponent = () => {
  const { items, loading, handleItemPress } = useActions();

  if (loading) return <LoadingSpinner size="large" />;
  return <ItemList items={items} onItemPress={handleItemPress} />;
};
```

### Utils vs useActions

| **utils.ts** | **useActions hook** |
|--------------|---------------------|
| Pure functions | State management |
| Data formatting | Navigation actions |
| Validation helpers | API calls with loading |
| Constants | Modal/UI state control |

## Testing

- **Location:** Co-locate test files (e.g., `useMyStore.test.ts`)
- **Naming:** `.test.ts` or `.test.tsx`

```typescript
// Testing stores
import { useMyStore } from "./useMyStore";

jest.mock("@/network", () => ({ apiClient: { get: jest.fn() } }));

describe("useMyStore", () => {
  beforeEach(() => {
    useMyStore.getState().resetStore();
    jest.clearAllMocks();
  });

  it("should fetch items", async () => {
    await useMyStore.getState().fetchItems();
    expect(useMyStore.getState().items).toHaveLength(1);
  });
});
```

**Mock Rule:** Declare mock functions at top level, never inline in `jest.mock()`.

## Quick Reference

### File Checklist

1. ✅ Component directory with PascalCase name
2. ✅ `IProps` type in component file
3. ✅ `styles.ts` with `createStyles(theme)`
4. ✅ `useTheme()` hook integration
5. ✅ `index.ts` with named export
6. ✅ `@/` path aliases for imports

### Red Flags (Refactor These)

- Multiple `useState` in main component → move to `useActions`
- Business logic in component → move to `useActions`
- Inline styles → move to `styles.ts`
- Direct store access in component → wrap in `useActions`

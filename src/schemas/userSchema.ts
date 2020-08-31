export const createUserSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
    },
  },
  required: ["name"],
};

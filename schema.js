const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const categories = [
  { id: "1", name: "movies" },
  { id: "2", name: "music" }
];

const entries = [
  { id: "1", name: "The Handmaiden", categoryId: 1 },
  { id: "2", name: "The War on Drugs", categoryId: 2 },
  { id: "3", name: "Another artist", categoryId: 2 }
];

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const EntryType = new GraphQLObjectType({
  name: "Entry",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    categoryId: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    entry: {
      type: EntryType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parentValue, args) => {
        return entries.find(entry => entry.id === args.id);
      }
    },
    entries: {
      type: new GraphQLList(EntryType),
      resolve: (parentValue, args) => {
        return entries;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

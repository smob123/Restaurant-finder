const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = require('graphql');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./userModel');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        jwt: { type: GraphQLString }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        Signup: {
            type: UserType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                const data = [args.username, args.email, args.password];

                data.forEach((item) => {
                    if (!item || item.toString().trim() == '') {
                        throw new Error('Please fill in the empty fields');
                    }
                });

                await User.findOne({
                    email: args.email
                }).then((user) => {
                    if (user) {
                        throw new Error('The provided email address is already attached to an account');
                    }
                });

                const encryptedPassword = await bcrypt.hash(args.password.toString(), 10);
                const token = (new Buffer(args.username, 'utf8')).toString('base64');

                let u = new User({
                    email: args.email.toString().toUpperCase(),
                    username: args.username.toString(),
                    password: encryptedPassword,
                    jwt: jwt.sign(token, 'JWT_SECRET')
                });

                return await u.save();
            }
        },
        Login: {
            type: UserType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                const data = [args.email, args.password];

                data.forEach((item) => {
                    if (!item || item.toString().trim() === '') {
                        throw new Error('Please fill in the empty fields');
                    }
                });

                const searchUser = await User.findOne({
                    email: args.email.toString().toUpperCase()
                }).then(async (user) => {
                    if (!user || user === null) {
                        throw new Error('Email not found');
                    }
                    else {
                        const validPassword = await bcrypt.compare(args.password.toString(), user.password);
                        if (!validPassword) {
                            throw new Error('Password is incorrect');
                        }

                        user.jwt = jwt.sign({ id: user._id }, 'JWT_SECRET');
                    }

                    return user;
                });

                return searchUser;
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Users: {
            type: new GraphQLList(UserType),
            resolve: (parent, args) => {
                return User.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});

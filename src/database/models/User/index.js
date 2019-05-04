import bcrypt from 'bcrypt';

export default class User {

    constructor(sequelize, DataTypes) {
        this.column = 'users';
        this.sequelize = sequelize;
        this.DataTypes = DataTypes;
    }

    async initial() {
        const Model = await this.sequelize.define(this.column, {
            id: {
                type: this.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: this.DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: this.DataTypes.STRING,
                allowNull: false,
                unique: 'compositeIndex'
            },
            password: {
                type: this.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                field: 'created_at',
                type: this.DataTypes.DATE,
                defaultValue: this.DataTypes.NOW
            },
            updatedAt: {
                field: 'updated_at',
                type: this.DataTypes.DATE,
                defaultValue: this.DataTypes.NOW
            }
        }, {
                hooks: {
                    beforeCreate: async (user, options) => {
                        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
                    },
                    beforeUpdate: async (user, options) => {
                        user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
                    }
                }
            }
        );
        await Model.sync();
        return Model;
    }
}
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  gender?: 'male' | 'female' | 'non-binary' | 'other';
  last_login?: Date;
  private: boolean;
  only_friends: boolean;
  birth_date?: string;
  ubication?: string;
  native_city?: string;
  civil_status?: string;
  verified: boolean;
  banned: boolean;
  tag?: string;
  job?: string;
  banner?: string;
  active: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 
  'id' | 'profilePicture' | 'bio' | 'gender' | 'last_login' | 'birth_date' | 
  'ubication' | 'native_city' | 'civil_status' | 'tag' | 'job' | 'banner' | 
  'private' | 'only_friends' | 'verified' | 'banned' | 'active'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public profilePicture?: string;
  public bio?: string;
  public gender?: 'male' | 'female' | 'non-binary' | 'other';
  public last_login?: Date;
  public private!: boolean;
  public only_friends!: boolean;
  public birth_date?: string;
  public ubication?: string;
  public native_city?: string;
  public civil_status?: string;
  public verified!: boolean;
  public banned!: boolean;
  public tag?: string;
  public job?: string;
  public banner?: string;
  public active!: boolean;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 25],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh2-2t3Bmos3JVvS5V1NtxI-RlRjVIHLcp-sf55WCcEA&s=10"
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'non-binary', 'other'),
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true,
      },
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    only_friends: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
      },
    },
    ubication: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    native_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    civil_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://img.magnific.com/free-vector/banner-with-gingham-tablecloth-top-view-design_107791-12974.jpg?semt=ais_hybrid&w=740&q=80"
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
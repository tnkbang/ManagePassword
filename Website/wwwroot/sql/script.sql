GO
Create database PasswordManager
GO
use PasswordManager
GO

create table Users(
	uid char(10) primary key,
	first_name nvarchar(20),
	last_name nvarchar(7),
	birthday datetime,
	sex int,
	phone varchar(11),
	username varchar(20) not null unique,
	password varchar(32) not null,
	image varchar(100),
	active bit not null,
	description nvarchar(500),
	created datetime not null
)

create table HasVerified(
	uid char(10) primary key references Users(uid),
	email varchar(75) not null unique,
	state bit not null
)

create table TypePassword(
	type_code char(5) primary key,
	type_name nvarchar(20) not null,
	description nvarchar(10),
	image varchar(100)
)

create table HasPassword(
	uid char(10) references Users(uid),
	type_code char(5) references TypePassword(type_code) not null,
	username varchar(50) not null,
	password varchar(256) not null,
	created datetime not null,
	primary key (uid, type_code, username)
)

GO
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'DM001', N'Tenten', N'Domain', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'DT001', N'GitHub', N'Data', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'DT002', N'One Drive', N'Data', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'DT003', N'DropBox', N'Data', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'R0001', N'tailieu.vn', N'Read', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'R0002', N'sourcecodec.net', N'Read', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'R0003', N'Autocode', N'Read', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0001', N'Gmail', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0002', N'Microsoft', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0003', N'MS Office', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0004', N'Discord', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0005', N'Zalo', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0006', N'FaceBook', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0007', N'Instagram', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0008', N'Twitch', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0009', N'Twitter', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0010', N'Pinterest', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0011', N'Ngrok', N'Using', NULL)
INSERT [dbo].[TypePassword] ([type_code], [type_name], [description], [image]) VALUES (N'U0012', N'LinedIn', N'Using', NULL)
GO
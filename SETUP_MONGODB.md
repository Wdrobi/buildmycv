# MongoDB Atlas Setup - Step by Step

Complete this first before deploying to Vercel.

## Step 1: Create MongoDB Atlas Account (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google
4. Verify your email

## Step 2: Create a Cluster (3 minutes)

1. After verification, you'll see "Create a Deployment"
2. Select **M0 (Free)** - perfect for your needs
3. Choose **AWS** region closest to you
4. Click "Create Deployment"
5. Wait 1-2 minutes for cluster to provision

## Step 3: Create Database User (2 minutes)

1. In the left menu, click **Database Access**
2. Click **"Add New Database User"**
3. Enter:
   - **Username**: `buildmycv`
   - **Password**: Create a strong password (save it!)
   - **Example**: `MySecure123Pass!`
4. Click **"Add User"**

✅ **Save this username and password!** You'll need it for the connection string.

## Step 4: Set Network Access (1 minute)

1. In left menu, click **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This is safe for development/Vercel
4. Click **"Confirm"**

## Step 5: Get Connection String (2 minutes)

1. Click **"Databases"** in left menu
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Choose **Node.js**
5. Copy the connection string

It looks like:
```
mongodb+srv://buildmycv:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 6: Customize Connection String (1 minute)

Replace the placeholder in the connection string:

**Original**:
```
mongodb+srv://buildmycv:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Your version** (replace PASSWORD):
```
mongodb+srv://buildmycv:MySecure123Pass!@cluster0.xxxxx.mongodb.net/buildmycv?retryWrites=true&w=majority
```

⚠️ **Important**: Replace `PASSWORD` with your actual password from Step 3!

## Step 7: Test Connection (Optional but Recommended)

In MongoDB Compass (download from https://www.mongodb.com/products/compass):

1. Click "New Connection"
2. Paste your connection string
3. Click "Connect"
4. You should see your empty database

✅ **Connection successful!** Your database is ready.

---

## 🎯 What You Have Now:

✅ MongoDB Atlas account created
✅ Free cluster provisioned
✅ Database user created
✅ Connection string ready

**Connection string to use for Vercel**:
```
mongodb+srv://buildmycv:MySecure123Pass!@cluster0.xxxxx.mongodb.net/buildmycv?retryWrites=true&w=majority
```

---

## Next Step:

→ Set up GitHub repository (see SETUP_GITHUB.md)
→ Then deploy to Vercel (see SETUP_VERCEL.md)

<!DOCTYPE html>
<html>
	<head>
		<title>Inventory.ai</title>
		<link rel="icon" type="image/x-icon" href="/image/favicon.png">
		<link rel="stylesheet" href="/file/styles.css"></link>
		<link rel="stylesheet" href="/file/bubbles.css"></link>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Comme&family=Poppins:wght@400;700&family=Source+Code+Pro&display=swap" rel="stylesheet">
		<script src="/file/module.js"></script>
	</head>
	<body>
		<div class="background" style="background-image: linear-gradient(to bottom, #0e2027, #020D14); background-color: #020D14;"></div>
		
		<section class="sticky">
  		<div class="bubbles">
      	<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
			<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
			<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
			<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
    		<div class="bubble"></div>
  		</div>
		</section>

		<div class="loadingFrame"><div></div></div>

		<div class="alert">
			<p>An error has occured.</p>
		</div>

		<div id="0">
			<img src="/image/title.png" class="mainTitle" style="width: 40%;">
			<div class="authDiv">
				<h1 style="font-size: 30px;">Sorry but... you need to be on a mobile device to access this app.</h1>
			</div>
		</div>
		
		<div id="1">
			<img src="/image/logo.png" class="mainLogo">
			<button class="authBtn" data-direct="2" style="bottom: 200px;">Login</button>
			<button class="authBtn" data-direct="3">Sign Up</button>
		</div>
		
		<div id="2">
			<img src="/image/title.png" class="mainTitle">
			<div class="authDiv">
				<h1>Welcome Back!</h1>
				<input data-original="Email" placeholder="Email" style="border-bottom: 1px solid white;" id="loginEmailInput"><br>
				<input data-original="Password" placeholder="Password" type="password" style="border-bottom: 1px solid white;" id="loginPasswordInput"><br>
				<button class="actionBtn" id="loginBtn">Login</button>
			</div>
			<p data-direct="3" style="font-size: 30px;">Don't have an account? Sign up</p>
		</div>
		
		<div id="3">
			<img src="/image/title.png" class="mainTitle">
			<div class="authDiv">
				<h1>Create Your Account.</h1>
				<input data-original="Email" placeholder="Email" id="emailInput" style="border-bottom: 1px solid white;"><br>
				<input  data-original="Password" placeholder="Password" type="password" id="passwordInput" style="border-bottom: 1px solid white;"><br>
				<button class="actionBtn" id="signUpBtn">Sign Up</button>
			</div>
			<p data-direct="2" style="font-size: 30px;">Already have an account? Login</p>
		</div>

		<div id="4">
			<div class="topDiv">
				<nav>
					<p class="invValue">$0</p>
					<button data-direct="8" class="addBtn">Add Item</button>
				</nav>
				<div class="itemContainer">
					<p class="emptyMsg">You havn't added any items yet.</p>
					<div class="bottomSpace" style="margin-bottom: 40vw;"></div>
				</div>
			</div>
			<div class="navDiv">
				<img src="image/xsold.png" data-direct="7">
				<img src="image/box.png">
				<img src="image/xaccounts.png" data-direct="6">
				<img src="image/xsettings.png" data-direct="5">
			</div>
		</div>

		<div id="5">
			<div class="topDiv">
				<h1>Settings</h1>
				<h2>Account</h2>
				<div class="emailDiv">
					<p id="emailDisplay" style="margin-top: 0px;"></p>
					<button id="logoutBtn">Logout</button>
				</div>
				<h2>Platforms</h2>
				<div class="platformDiv">
					<img src="/image/ebay.png">
					<p>Ebay</p>
				</div>
			</div>
			<div class="navDiv">
				<img src="image/xsold.png" data-direct="7">
				<img src="image/xbox.png" data-direct="4">
				<img src="image/xaccounts.png" data-direct="6">
				<img src="image/settings.png">
			</div>
		</div>

		<div id="6">
			<div class="topDiv">
				<h1>Your Accounts</h1>
				<p>You don't have any accounts yet.</p>
				<button>Add Account</button>
			</div>
			<div class="navDiv">
				<img src="image/xsold.png" data-direct="7">
				<img src="image/xbox.png" data-direct="4">
				<img src="image/accounts.png">
				<img src="image/xsettings.png" data-direct="5"> 
			</div>
		</div>

		<div id="7">
			<div class="topDiv">
				<nav>
					<p>$0</p>
                    <button class="sellBtn">Sell Item</button>
				</nav>
				<div>
					<p>You havn't sold any items yet.</p>
				</div>
			</div>
			<div class="navDiv">
				<img src="image/sold.png">
				<img src="image/xbox.png" data-direct="4">
				<img src="image/xaccounts.png" data-direct="6">
				<img src="image/xsettings.png" data-direct="5">
			</div>
		</div>

		<div id="8">
			<div class="topDiv">
				<h1>Take a picture of your item.</h1>
				<div class="video">
					<div class="videoLoad"></div>
					<canvas></canvas>
					<video muted autoplay id="video" autoplay muted hidden playsinline></video>
				</div>
				<button class="streamCloser" data-direct="9">Take Picture</button>
				<button data-direct="4" class="streamCloser">Cancel</button>
			</div>
		</div>

		<div id="9">
			<div class="topDiv">
				<h1>More Info</h1>
				<img class="finalizeImg" style="left: 0; margin-top: 0px; margin-bottom: 70px;"><br>
				<input id="nameInput" placeholder="Name" data-original="Name"><br>
				<p style="margin-top: 0px; font-size: 50px;" class="condition">Condition - </p><br>
				<input id="conditionInput" type="range"><br>
 				<button style="top: -40px;" class="getValueBtn">Get Value</button>
			</div>
		</div>

		<div id="10">
			<div class="topDiv">
				<h1 class="selectedName">Name</h1>
				<img style="left: 0; margin-top: 0px; width: 80vw; height: 80vw;" class="selectedImg"><br>
				<p class="selectedValue" id="selected">Estimated Value: $ - $</p>
                <p class="selectedQuantity" id="selected">Quantity: </p>
                <p class="selectedCondition" id="selected">Condition: </p>
				<button style="margin-top: 120px;" id="deleteBtn">Delete</button>
				<button data-direct="4">Close</button>
			</div>
		</div>

        <div id="11">
            <div class="topDiv">
				<h1 class="itemName">Name</h1>
				<img class="finalizeImg" id="valuedImg" style="left: 0; margin-top: 0px; margin-bottom: 70px;"><br>
				<p class="estimate">Estimate Value: $1 - $2.5</p>
                <input placeholder="Quantity" type="number" id="quantity" data-original="Quantity" style="margin-top: -15px;">
 				<button class="saveBtn">Save</button>
                <button data-direct="4">Cancel</button>
			</div>
        </div>
		<script src="/file/script.js"></script>
	</body>
</html>

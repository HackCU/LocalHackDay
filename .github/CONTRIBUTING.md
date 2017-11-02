# Contributing Guidelines

Want to contribute to this repo? Great! We :heart: contributions. Just make sure to follow these guidelines.

## New Feature or a Bug Fix?
1. Fork the repo (you can ignore this step if you are a part of the HackCU team)
2. Create a new branch with a descriptive name of the feature or the bug you are fixing.
3. If you are a part of the HackCU team, push the branch to the remote so that others know that you are working on this branch. Otherwise, create a new issue mentioning that you would like to add a new feature or fix a bug you noticed. This lets us know that someone is already helping us fix the issue!
4. Make changes and commit them. Your commit messages should be descriptive and imperative. Read [this](http://who-t.blogspot.com/2009/12/on-commit-messages.html) for guidelines.
5. If you edit any CSS of JS files, make sure you update the version number on the `index.html` file for the corresponding files.
	* If the edit is small, 5 or fewer changes, update the `x` in `0.0.x`
	* If you created or deleted more than 2 classes or ids, update the `x` in `0.x.0`
	* If you made a huge change that will entirely change how the website looks or functions, update the `x` in `x.0.0`
6. Test locally and make sure the website functions properly and you didn't break anything.
7. Create a pull request with a descriptive title. Clearly document any changes you made. You should be able to explain why you made those changes.

## Working on the Next Release?
1. Work on the `dev` or `develop` branch
2. If you edit any CSS of JS files, make sure you update the version number on the `index.html` file for the corresponding files.
	* If the edit is small, 5 or fewer changes, update the `x` in `0.0.x`
	* If you created or deleted more than 2 classes or ids, update the `x` in `0.x.0`
	* If you made a huge change that will entirely change how the website looks or functions, update the `x` in `x.0.0`
	You will most probably end up making the third change.
3. Test locally and make sure the website functions properly and you didn't break anything.
4. Create a pull request with a descriptive title. Clearly document any changes you made. You should be able to explain why you made those changes.

## Adding a new sponsor or partner logo?
Follow the usual GitHub workflow outlined in the [first section](#new-feature-or-a-bug-fix?).
Then follow these specific guidelines for resizing the logo.
If you don't have access to professional tools like Photoshop, download [GIMP](https://www.gimp.org/downloads/). It is free, open source, and has all the features you will need for resizing logos.
1. Store the original logo in the `originals/` folder.
2. Resize the logo to `600 x 400` px i.e., 600 px wide and 400 px tall.
3. When resizing, turn on anti-aliasing to make sure the logo doesn't pixelate too much.
4. Center the logo and make sure to leave some whitespace around the margins. If in doubt, add the logo to the website and view your changes on the browser to check if it is aligned properly and the logo is neither too large not too small compared to other logos.
5. Finally, remove the background i.e., the background should be transparent and save as `PNG` file.
If you're feeling lucky, try compressing the image outlined [here](https://github.com/HackCU/HackCU/pull/14).

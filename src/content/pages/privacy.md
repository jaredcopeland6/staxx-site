---
title: "Privacy Policy"
description: "What Staxx collects, who can see it, the services we use, and how to delete your account."
updated: 2026-11-05
---

Staxx is a social book-tracking app: you rank books you've read against each other, keep a shelf of what you want to read, and see what people you follow are reading. This page describes exactly what the app collects, why, and who can see it - matched to what the app actually does, not a generic template.

## Information we collect

- **Email address** - collected at sign-up and managed by our authentication provider, Supabase Auth. We use it to identify your account and for account-related emails (e.g. confirming your address). We never see or store your password ourselves.
- **Username** - your unique @handle, which other users see.
- **Display name** - optional, up to 40 characters. If you set one, it's shown on your profile, in the activity feed, and in people search, alongside your username. It can be any name you like, including your real name. You can change or clear it at any time in Edit profile.
- **Profile picture** - optional. If you choose one, the image is resized on your device and stored by our backend provider. You can replace it at any time, and deleting your account deletes it. See "Who can see your information" for an important note about how it is served.
- **Books you shelve and rank** - which books you've marked as to-be-read, currently reading, or read, plus the 0-10 score and rank position each ranked book receives, and the date you finished each book you mark read (filled in automatically when you mark it read, and editable).
- **Written reviews** - optional. If you write a review of a book you've ranked (up to 15,000 characters), it's saved with that ranking and shown with it.
- **Pairwise comparison choices** - when you rank a book, the app asks you to compare it against a few books you've already ranked. We keep a permanent log of those choices so your ranking history can be audited and so the ranking algorithm can improve later without losing that history. This log is private to you - see "Who can see your information" below.
- **Follows** - who you follow and who follows you.
- **Tag suggestions** - if you suggest a descriptive tag (genre or vibe) for a book, we record which tag and which book; we do not publicly attribute a specific suggestion to your account in the app's display, but the row itself, like other social data in the app, is readable via the same access described below.
- **Activity** - a record of your shelf changes and rankings, used to build the activity feed shown to people who follow you.
- **Blocks and reports** - if you block someone, we record that so the two of you are hidden from each other. If you report someone, we record who you reported, the reason you picked, and any note you add. We also record when you agreed to our Terms of Use and this policy at sign-up.
- **Waitlist email (website only)** - if you join the waitlist on staxxbooks.com, we store the email address you enter, which form you used, and when. We use it only to tell you when Staxx is available, and it isn't linked to an app account. To be removed, email [admin@staxxbooks.com](mailto:admin@staxxbooks.com).

We do not ask for your real name, phone number, address, payment information, or precise location, because the app doesn't use any of those. If you choose to use your real name as your display name, it is visible to other users like the rest of your profile.

## Who can see your information

Staxx is a social app, and most of the data above is visible to other signed-in users, not only people who follow you - this is true today of your username and display name, your rankings and written reviews, your shelf (including finish dates), your follows/followers list, and your activity. Some things are private: only you can see your pairwise comparison choices and your list of blocked accounts, and nobody you report can see that you reported them - reports are read only by Staxx's moderator. Someone you have blocked can't see any of your information in the app, and you can't see theirs.

**Your profile picture is more public than the rest.** Unlike everything above, which requires a signed-in account to read, a profile picture is served from a public web address. Anyone who has that address can view the image without signing in to Staxx, and it may be cached by browsers or content delivery networks after you replace or delete it. Addresses are not listed or published anywhere, so this is not the same as the image being searchable - but please treat a profile picture as public, and don't upload anything you would not want seen outside the app. Only you can change or remove your own picture.

## How we use your information

To run the core features of the app: showing your ranked shelf, predicting a "Personal Score" for books you haven't read yet based on your own ranking history and your friends' rankings, and building the activity feed. We also use reports to review content and accounts against our Terms of Use, which can mean removing a review, profile picture, username, or display name, or suspending an account. We do not use your information for advertising, and we do not sell your information to anyone.

## Third-party services we use

- **Open Library** - when you search for or add a book, we send that search to Open Library's public API to fetch its title, author, cover image, and description. No account information is included in that request.
- **Apple (Apple Books)** - to show a book's cover and details, our server looks the book up in Apple's public book catalog by its title and author. No account information is included.
- **Google Books** - our server checks whether a book is fiction or non-fiction against Google's public book catalog, using only the book's title and author.
- **Cover images** - the app loads book covers directly from Apple's and Open Library's image servers. Like any website, those servers can see your device's IP address when an image loads; nothing else about you is sent.
- **Anthropic (Claude)** - we use Anthropic's AI models to classify a book's genre and tags. Only the book's own public metadata (title, author, subjects, description) is sent for this - never your email, username, or reading history.
- **Supabase** - our backend provider, which hosts our database, handles authentication, and runs our server-side code. Supabase processes all of the data described above on our behalf, under its own security and privacy commitments.
- **Cloudflare** - hosts our website, staxxbooks.com. On the waitlist form, Cloudflare Turnstile checks that you are a person and not a bot; to do that it processes technical information such as your IP address and browser details. Cloudflare Web Analytics counts website visits without cookies and without identifying you.

We do not use any third-party advertising services. The app uses no analytics service today; the website counts visits with Cloudflare Web Analytics, which sets no cookies.

## Data retention and deletion

You can permanently delete your account at any time from inside the app: **Profile → Settings → Delete account**. Deleting your account immediately and permanently removes your rankings and written reviews, shelf items and finish dates, comparison history, follows and followers, activity, tag suggestions, blocks, reports you've filed, your profile picture, and your profile (including your username and display name) - this cannot be undone.

## Children's privacy

Staxx is not directed at children under 13, and we do not knowingly collect personal information from children under 13.

## Changes to this policy

If this policy changes, we'll update the "Last updated" date above.

## Contact

Questions about this policy or your data: [admin@staxxbooks.com](mailto:admin@staxxbooks.com)

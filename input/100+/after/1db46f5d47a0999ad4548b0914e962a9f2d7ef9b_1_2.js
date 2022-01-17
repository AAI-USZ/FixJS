function twinklespeedyGetGeneralList(multiple) {
	var result = [];
	if (!multiple) {
		result.push({
			label: 'Custom rationale' + (Morebits.userIsInGroup('sysop') ? ' (custom deletion reason)' : ' using {'+'{db}} template'),
			value: 'reason',
			tooltip: '{'+'{db}} is short for "delete because". At least one of the other deletion criteria must still apply to the page, and you must make mention of this in your rationale. This is not a "catch-all" for when you can\'t find any criteria that fit.'
		});
	}
	result.push({
		label: 'G1: Patent nonsense. Pages consisting purely of incoherent text or gibberish with no meaningful content or history.',
		value: 'nonsense',
		tooltip: 'This does not include poor writing, partisan screeds, obscene remarks, vandalism, fictional material, material not in English, poorly translated material, implausible theories, or hoaxes. In short, if you can understand it, G1 does not apply.'
	});
	result.push({
		label: 'G2: Test page',
		value: 'test',
		tooltip: 'A page created to test editing or other Wikipedia functions. Pages in the User namespace are not included, nor are valid but unused or duplicate templates (although criterion T3 may apply).'
	});
	result.push({
		label: 'G3: Pure vandalism',
		value: 'vandalism',
		tooltip: 'Plain pure vandalism (including redirects left behind from pagemove vandalism)'
	});
	if (!multiple) {
		result.push({
			label: 'G3: Blatant hoax',
			value: 'hoax',
			tooltip: 'Blatant and obvious hoax, to the point of vandalism'
		});
	}
	result.push({
		label: 'G4: Recreation of material deleted via a deletion discussion',
		value: 'repost',
		tooltip: 'A copy, by any title, of a page that was deleted via an XfD process or Deletion review, provided that the copy is substantially identical to the deleted version. This clause does not apply to content that has been "userfied", to content undeleted as a result of Deletion review, or if the prior deletions were proposed or speedy deletions, although in this last case, other speedy deletion criteria may still apply'
	});
	result.push({
		label: 'G5: Banned user',
		value: 'banned',
		tooltip: 'Pages created by banned users while they were banned'
	});
	if (!multiple) {
		result.push({
			label: 'G6: History merge',
			value: 'histmerge',
			tooltip: 'Temporarily deleting a page in order to merge page histories'
		});
		result.push({
			label: 'G6: Move',
			value: 'move',
			tooltip: 'Making way for a noncontroversial move like reversing a redirect'
		});
		result.push({
			label: 'G6: XfD',
			value: 'xfd',
			tooltip: 'An admin has closed a deletion discussion (at AfD, FfD, RfD, TfD, CfD, SfD, or MfD) as "delete", but they didn\'t actually delete the page.'
		});
		result.push({
			label: 'G6: Unnecessary disambiguation page',
			value: 'disambig',
			tooltip: 'This only applies for orphaned disambiguation pages which either: (1) disambiguate two or fewer existing Wikipedia pages and whose title ends in "(disambiguation)" (i.e., there is a primary topic); or (2) disambiguates no (zero) existing Wikipedia pages, regardless of its title.'
		});
		result.push({
			label: 'G6: Redirect to malplaced disambiguation page',
			value: 'movedab',
			tooltip: 'This only applies for redirects to disambiguation pages ending in (disambiguation) where a primary topic does not exist.'
		});
		result.push({
			label: 'G6: Copy-and-paste page move',
			value: 'copypaste',
			tooltip: 'This only applies for a copy-and-paste page move of another page that needs to be temporarily deleted to make room for a clean page move.'
		});
	}
	result.push({
		label: 'G6: Housekeeping',
		value: 'g6',
		tooltip: 'Other non-controversial "housekeeping" tasks'
	});
	result.push({
		label: 'G7: Author requests deletion, or author blanked',
		value: 'author',
		tooltip: 'Any page for which deletion is requested by the original author in good faith, provided the page\'s only substantial content was added by its author. If the author blanks the page, this can also be taken as a deletion request.'
	});
	result.push({
		label: 'G8: Pages dependent on a non-existent or deleted page',
		value: 'g8',
		tooltip: 'such as talk pages with no corresponding subject page; subpages with no parent page; file pages without a corresponding file; redirects to invalid targets, such as nonexistent targets, redirect loops, and bad titles; or categories populated by deleted or retargeted templates. This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
	});
	if (!multiple) {
		result.push({
			label: 'G8: Subpages with no parent page',
			value: 'subpage',
			tooltip: 'This excludes any page that is useful to the project, and in particular: deletion discussions that are not logged elsewhere, user and user talk pages, talk page archives, plausible redirects that can be changed to valid targets, and file pages or talk pages for files that exist on Wikimedia Commons.'
		});
	}
	result.push({
		label: 'G10: Attack page',
		value: 'attack',
		tooltip: 'Pages that serve no purpose but to disparage their subject or some other entity (e.g., "John Q. Doe is an imbecile"). This includes a biography of a living person that is negative in tone and unsourced, where there is no NPOV version in the history to revert to. Administrators deleting such pages should not quote the content of the page in the deletion summary!'
	});
	if (!multiple) {
		result.push({
			label: 'G10: Wholly negative, unsourced BLP',
			value: 'negublp',
			tooltip: 'A biography of a living person that is entirely negative in tone and unsourced, where there is no neutral version in the history to revert to.'
		});
	}
	result.push({
		label: 'G11: Unambiguous advertising',
		value: 'spam',
		tooltip: 'Pages which exclusively promote a company, product, group, service, or person and which would need to be fundamentally rewritten in order to become encyclopedic. Note that an article about a company or a product which describes its subject from a neutral point of view does not qualify for this criterion; an article that is blatant advertising should have inappropriate content as well'
	});
	result.push({
		label: 'G12: Unambiguous copyright infringement',
		value: 'copyvio',
		tooltip: 'Either: (1) Material was copied from another website that does not have a license compatible with Wikipedia, or is photography from a stock photo seller (such as Getty Images or Corbis) or other commercial content provider; (2) There is no non-infringing content in the page history worth saving; or (3) The infringement was introduced at once by a single person rather than created organically on wiki and then copied by another website such as one of the many Wikipedia mirrors'
	});
	return result;
}
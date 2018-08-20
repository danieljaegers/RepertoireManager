package com.daj.repertoiremanager;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView home(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView("home");
		return mav;
	}
	
	@RequestMapping(value = "/solo", method = RequestMethod.GET)
	public ModelAndView solo(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView("solo");
		return mav;
	}
	
	@RequestMapping(value = "/ensemble", method = RequestMethod.GET)
	public ModelAndView ensemble(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView("ensemble");
		return mav;
	}
}

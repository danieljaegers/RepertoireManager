package com.daj.repertoiremanager;

import java.io.NotActiveException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * @author daxtyn_hiestand & daniel_jaegers
 *
 */
public class BaseController {
	private static final Logger LOGGER = Logger.getLogger(BaseController.class);


	/**
	 * Catches any uncaught Exceptions and returns error page
	 * 
	 * @param error - The error that occurred
	 * @param request - Request to the page
	 * @param response - Response to the page
	 */
	@ExceptionHandler(Exception.class)
	public void handleException(Exception error, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.error("Error processing request");
		//TODO Error Handling 
		if (error instanceof NotActiveException) {
			response.setStatus(HttpStatus.SERVICE_UNAVAILABLE.value());
//			handleError("error.unavailable", "Service is currently unavailable", 
//					HttpServletResponse.SC_SERVICE_UNAVAILABLE, response);
		} else {
//			handleError("error.internal", "Internal Error",	HttpServletResponse.SC_INTERNAL_SERVER_ERROR, response);
		}
	}


}

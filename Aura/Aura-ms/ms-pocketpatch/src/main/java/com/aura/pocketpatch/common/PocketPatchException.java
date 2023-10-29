package com.aura.pocketpatch.common;

public class PocketPatchException extends RuntimeException {
    public PocketPatchException(String message, Throwable cause) {
        super(message, cause);
    }

    public PocketPatchException(String message) {
        super(message);
    }
}
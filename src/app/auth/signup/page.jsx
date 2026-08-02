"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input, Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { useRouter, useSearchParams } from 'next/navigation';
import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("reader")

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                role,
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPassword("");
                router.push(redirectTo);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-sans text-gray-900">
            <Card className="w-full max-w-md p-8 shadow-sm border border-gray-200 bg-white rounded-xl">

                {/* Header Container */}
                <div className="flex flex-col">
                    <span className="text-lg sm:text-xl font-black tracking-wider text-black leading-none">
                        BIBLIO<span className="text-red-600">DROP</span>
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">
                        Library Delivery Network
                    </span>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSignup} className="flex flex-col gap-5">

                    {/* Name Field */}
                    <TextField isRequired name="name" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-gray-700">Name</Label>
                        <InputGroup className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 bg-white transition-colors h-11">
                            <Person className="text-gray-400 pointer-events-none shrink-0" size={16} />
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-gray-900 placeholder:text-gray-400"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Email Field */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-gray-700">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 bg-white transition-colors h-11">
                            <At className="text-gray-400 pointer-events-none shrink-0" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-gray-900 placeholder:text-gray-400"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-gray-700">Password</Label>
                        <InputGroup className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 bg-white transition-colors h-11">
                            <ShieldKeyhole className="text-gray-400 pointer-events-none shrink-0" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-gray-900 placeholder:text-gray-400"
                            />
                            <button
                                className="focus:outline-none text-gray-400 hover:text-gray-600 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    <div className="flex flex-col gap-4">
                        <Label>Role</Label>
                        <RadioGroup defaultValue="reader" name="role" onChange={value => setRole(value)} orientation="horizontal">
                            <Radio value="reader">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Reader
                                </Radio.Content>
                            </Radio>
                            <Radio value="librarian">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Librarian
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Dynamic Status Badges */}
                    {error && (
                        <div className="p-3 text-xs font-medium rounded-lg bg-red-50 text-red-600 border border-red-200">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* Action Button */}
                    <Button
                        type="submit"
                        className="w-full font-medium rounded-lg text-sm h-11 bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign Up
                    </Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-gray-100 mt-2 text-xs text-gray-500">
                        Already have an account?{" "}
                        <Link href={`/auth/signin?redirect=${redirectTo}`} className="font-semibold cursor-pointer text-xs text-red-600 hover:text-red-700 hover:underline">
                            Sign in instead
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}
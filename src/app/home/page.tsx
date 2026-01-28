"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, LayoutDashboard, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
            });
        } catch (error) {
            console.error("Sign in failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-cyan-50 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <div className="w-full max-w-5xl px-4 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side: Branding & Features */}
                <div className="hidden lg:flex flex-col space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white font-bold text-xl">J</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Junu Board</span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
                            Manage your workflow <br />
                            <span className="text-indigo-600">with precision.</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-md leading-relaxed">
                            A minimalist Kanban board designed for teams who value clarity, speed, and beautiful design.
                        </p>
                    </div>

                    <div className="grid gap-4 mt-8">
                        {[
                            { icon: <LayoutDashboard className="w-5 h-5" />, title: "Visual Kanban", desc: "Drag and drop tasks with ease" },
                            { icon: <CheckCircle2 className="w-5 h-5" />, title: "Real-time Updates", desc: "Stay synced with your team" },
                            { icon: <Users className="w-5 h-5" />, title: "Team Collaboration", desc: "Assign roles and track progress" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-slate-100 shadow-sm backdrop-blur-sm">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side: Login Card */}
                <div className="flex justify-center">
                    <Card className="w-full max-w-[400px] shadow-2xl shadow-indigo-100/50 border-slate-100 bg-white/90 backdrop-blur-md">
                        <CardHeader className="space-y-2 flex flex-col items-center pb-8 border-b border-slate-50">
                            <div className="lg:hidden w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200">
                                <span className="text-white font-bold text-2xl">J</span>
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
                            <CardDescription className="text-slate-500 text-center">
                                Connect your account to get started
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 pt-8">
                            <Button
                                variant="outline"
                                onClick={handleGoogleSignIn}
                                disabled={isLoading}
                                className="w-full h-14 flex items-center justify-center gap-3 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-300 rounded-xl group"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        <span className="font-semibold text-slate-700">Continue with Google</span>
                                    </>
                                )}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-100"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-4 text-slate-400 font-medium">Coming Soon</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="ghost" disabled className="text-slate-400 text-sm h-12 rounded-xl border border-slate-50">
                                    Login with Email
                                </Button>
                                <Button variant="ghost" disabled className="text-slate-400 text-sm h-12 rounded-xl border border-slate-50">
                                    Single Sign-On
                                </Button>
                            </div>

                            <p className="text-center text-xs text-slate-400 px-6 leading-relaxed">
                                By continuing, you agree to our <span className="underline hover:text-slate-600 cursor-pointer">Terms of Service</span> and <span className="underline hover:text-slate-600 cursor-pointer">Privacy Policy</span>.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="absolute bottom-8 text-slate-400 text-sm flex items-center gap-4">
                <span>© 2024 Junu Board</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span className="flex items-center gap-1 hover:text-slate-600 cursor-pointer">Documentation <ArrowRight className="w-3 h-3" /></span>
            </div>
        </div>
    );
}